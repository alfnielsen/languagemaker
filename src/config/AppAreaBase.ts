import AreaBase, { ActionCreatorInterceptorOptions } from "redux-saga-area"

export enum ActionTracking {
   Requested = "Requested",
   Succeeded = "Succeeded",
   Failed = "Failed"
}
export interface IAppAreaBaseState {
   loading: boolean
   trackingMap: { [actionName: string]: ActionTracking }
   errorMap: {
      [key: string]: {
         error: Error
         message: string
         count: number
         currentCount: number
      }
   }
}
export const initAppAreaBaseState = (): IAppAreaBaseState => ({
   loading: false,
   trackingMap: {},
   errorMap: {}
})

export const AppAreaBase = new AreaBase({
   baseNamePrefix: "@@App",
   addNameSlashes: true,
   addShortNameSlashes: true,
   baseState: initAppAreaBaseState(),
   baseFailureAction: (error: Error) => ({ error }),
   baseFailureProducer: (draft, { error, actionName }) => {
      draft.errorMap[actionName] = {
         error,
         message: error.message,
         count: draft.errorMap[actionName]
            ? draft.errorMap[actionName].count + 1
            : 1,
         currentCount: draft.errorMap[actionName]
            ? draft.errorMap[actionName].count + 1
            : 1
      }
   },
   baseActionsIntercept: ({ actionName }: ActionCreatorInterceptorOptions) => ({
      actionName
   }),
   baseInterceptors: {
      Request: [
         (draft, { actionName }) => {
            draft.loading = true
            draft.trackingMap[actionName] = ActionTracking.Requested
         }
      ],
      Success: [
         (draft, { actionName }) => {
            draft.loading = false
            draft.trackingMap[actionName] = ActionTracking.Succeeded
            if (draft.errorMap[actionName]) {
               draft.errorMap[actionName].currentCount = 0
            }
         }
      ],
      Failure: [
         (draft, { actionName }) => {
            draft.loading = false
            draft.trackingMap[actionName] = ActionTracking.Failed
         }
      ],
      Clear: [
         (draft, { actionName }) => {
            delete draft.trackingMap[actionName]
         }
      ]
   }
})

export default AppAreaBase
