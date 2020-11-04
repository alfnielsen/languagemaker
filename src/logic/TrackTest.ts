import { useAreaHook } from "react-redux-area"

import AppAreaBase from "../config/AppAreaBase"
import { AreaRegistration, AreaSelector } from "../config/configureStore"

const area = AppAreaBase.Create("TrackTest", {
   data: [1, 2, 3]
})


const load = area
   .addFetch("load")
   .successAction((data: any) => ({ data }))
   .successProduce((draft, { data }) => {
      draft.data = data
   })
   .baseFailure()

area.takeEvery(() => load.request, function ({ data }) {
   return data.then(data)
})

area.takeEvery(() => load.success, function ({ data }) {
   return data.then(data)
})

area.takeEvery(() => load.failure, function* () {

})


const StructureAreaActions = {
   load: load.request
}

export const useTrackTest = () =>
   useAreaHook(StructureAreaActions, AreaSelector(area))

AreaRegistration(area)
