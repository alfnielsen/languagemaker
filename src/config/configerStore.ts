import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from "redux-saga"
import { all } from "redux-saga/effects"

import { IStructureAreaState, StructureArea } from "../logic/StructureArea"
import { IUserAreaState, UserArea } from "../logic/UserArea"

// Optional create full interface for entire store:
export interface IStoreState {
   userArea: IUserAreaState
   structureArea: IStructureAreaState
}

// Normal redux store setup
export const configureStore = () => {

   // Combined different areas into the store root reducer
   const rootReducer = combineReducers({
      userArea: UserArea.getRootReducer(),
      structureArea: StructureArea.getRootReducer()
   })

   // If there are only on area .rootSaga() can be used instead of this
   function* AppRootSaga() {
      yield all([
         ...UserArea.getSagas(),
         ...StructureArea.getSagas()
      ])
   }


   const sagaMiddleware = createSagaMiddleware()
   const newStore = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
   )
   sagaMiddleware.run(AppRootSaga)
   return newStore
}
