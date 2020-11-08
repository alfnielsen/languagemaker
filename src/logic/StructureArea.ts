import produce from "immer"
import { useAreaHook } from "react-redux-area"
import { collectionData, docData } from 'rxfire/firestore'
import { Subscription } from "rxjs"

import { store } from ".."
import AppAreaBase from "../config/AppAreaBase"
import { db } from '../config/firebase'
import { AreaRegistration, AreaSelector } from "../config/ReduxAreaStore"

export interface IStructure {
   id: string
   created: string
   updated: string
   name: string
   props: any
   testCode: { name: string, code: string }[]
   walkerSteps: any[]
   childrenIds: string[]
   children: IStructure[]
   parentId?: string
   parent?: IStructure
}

export interface IStructureAreaState {
   structures: IStructure[]
   current?: IStructure
   subscription?: Subscription // none raw data!
   subscriptionCurrent?: Subscription // none raw data!
   path: string
}

const area = AppAreaBase.Create<IStructureAreaState>("Structures", {
   structures: [],
   path: 'structure'
})

const subscribe = area
   .add("subscribe")
   .action((autoLogin = true) => ({ autoLogin }))
   .produce(draft => {
      if (!draft.subscription) {
         const query = db.collection(draft.path).orderBy('name')
         const collection = collectionData<IStructure>(query, 'id')
         draft.subscription = collection.subscribe(updatedCollection => {
            store.dispatch(updateLocal(updatedCollection))
         })
      }
   })

const unsubscribe = area
   .add("unsubscribe")
   .produce(draft => {
      if (draft.subscription) {
         draft.subscription.unsubscribe()
      }
   })

const updateLocal = area
   .add("updateLocal")
   .action((structures: IStructure[]) => ({ structures }))
   .produce((draft, { structures }) => {
      draft.structures = structures
   })

const add = area.add('add')
   .action((structure: IStructure) => ({ structure }))
   .produce((draft, { structure }) => {
      structure = produce(structure, structureDraft => {
         structureDraft.created = new Date().toISOString()
      })
      db.collection(draft.path).add(structure).then(docRef => {
         docRef.update({ id: docRef.id })
      })
   })

const update = area.add('update')
   .action((structure: IStructure) => ({ structure }))
   .produce((draft, { structure }) => {
      let index = draft.structures.findIndex(s => s.id === structure.id)
      console.log("UPDATE:::", index, draft.structures[index].testCode.map(t => t))
      if (index >= 0) {
         draft.structures[index] = produce(structure, structureDraft => {
            console.log("UPDATE:::1", index, structure.testCode.map(t => t))
            structureDraft.updated = new Date().toISOString()
         })
         console.log("UPDATE:::2", index, draft.structures[index].testCode.map(t => t))

      }
   })


const save = area.add('save')
   .action((structure: IStructure) => ({ structure }))
   .produce((draft, { structure }) => {
      db.collection(draft.path).doc(structure.id).update(structure)
   })

const remove = area.add('remove')
   .action((structure: IStructure) => ({ structure }))
   .produce((draft, { structure }) => {
      // consider soft delete:
      // structure.deleted = new Date().toISOString()
      if (structure.id === draft.current?.id) {
         select.use(draft, { structure: undefined })
      }
      db.collection(draft.path).doc(structure.id).delete()
   })

const select = area.add('current')
   .action((structure?: IStructure) => ({ structure }))
   .produce((draft, { structure }) => {
      draft.current = structure
      if (draft.subscriptionCurrent) {
         draft.subscriptionCurrent.unsubscribe() // unsubscribe last
      }
      if (!structure) return
      const ref = db.collection(draft.path).doc(structure.id)
      draft.subscriptionCurrent = docData<IStructure>(ref).subscribe(function (doc) {
         store.dispatch(updateCurrent(doc))
      })
   })

const updateCurrent = area.add('updateCurrent')
   .action((structure?: IStructure) => ({ structure }))
   .produce((draft, { structure }) => {
      draft.current = structure
   })

const StructureAreaActions = {
   updateLocal,
   subscribe,
   unsubscribe,
   add,
   save,
   update,
   select,
   remove
}


export const useStructures = () =>
   useAreaHook(StructureAreaActions, AreaSelector(area))

AreaRegistration(area)