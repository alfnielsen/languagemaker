import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from "redux-saga"
import { ActionCreatorInterceptor, Area, Func } from "redux-saga-area"
import { all, ForkEffect } from "redux-saga/effects"

type AnyArea = Area<any, any, any, any, any>
const areaList: { [key: string]: AnyArea } = {}

export const AreaRegistration = <
   TBaseState,
   TAreaState,
   TBaseFailureAction extends Func,
   TAreaFailureAction extends Func,
   TBaseActionTypeInterceptor extends ActionCreatorInterceptor
>(area: Area<TBaseState, TAreaState, TBaseFailureAction, TAreaFailureAction, TBaseActionTypeInterceptor>) => {
   if (areaList[area.namePrefix]) {
      throw new Error("There are already a registered area with name: " + area.namePrefix)
   }
   areaList[area.namePrefix] = area
}

export const AreaSelector = <
   TBaseState,
   TAreaState,
   TBaseFailureAction extends Func,
   TAreaFailureAction extends Func,
   TBaseActionTypeInterceptor extends ActionCreatorInterceptor
>(area: Area<TBaseState, TAreaState, TBaseFailureAction, TAreaFailureAction, TBaseActionTypeInterceptor>) =>
   ((state: any) => (state[area.namePrefix] as typeof area.initialState))

export const getAllRootReducers = () => {
   let reducerData: { [name: string]: (state: any, action: AnyAction) => any } = {}
   for (const [name, area] of Object.entries(areaList)) {
      reducerData[name] = area.getRootReducer()
   }
   // Combined different areas into the store root reducer
   const rootReducer = combineReducers(reducerData)
   return rootReducer
}

export const getAllSages = () => {
   let sagaData: ForkEffect<any>[] = []
   for (const [, area] of Object.entries(areaList)) {
      sagaData.push(...area.getSagas())
   }
   // Combined different areas into the store root reducer
   return function* AppRootSaga() {
      yield all(sagaData)
   }
}


// Normal redux store setup
export const configureStore = () => {
   // Combined different areas into the store root reducer
   const rootReducer = getAllRootReducers()
   const AppRootSaga = getAllSages()
   // If there are only on area .rootSaga() can be used instead of this

   const sagaMiddleware = createSagaMiddleware()
   const newStore = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
   )
   sagaMiddleware.run(AppRootSaga)
   return newStore
}
