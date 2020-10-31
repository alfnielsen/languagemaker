
import { db } from '../config/firebase'
import { collectionData } from 'rxfire/firestore'
import { startWith } from 'rxjs/operators'
import { user } from './user.store'
import { writable } from 'svelte/store'

export interface ITodo {
   text: string
   complete: boolean,
   created: string
}

export const todos = writable<ITodo[]>([])

export let addTodo = (text: string) => { }
export let updateTodoStatus = (id: string, complete: boolean) => { }
export let removeTodo = (id: string) => { }


user.subscribe(userData => {
   if (!userData) return
   const uid = userData?.uid
   const path = `users/${uid}/todos`
   const query = db.collection(path).orderBy('created')
   const todoCollection = collectionData<ITodo>(query, 'id').pipe<ITodo[]>(startWith<ITodo[]>([]))
   todoCollection.subscribe(todoList => {
      todos.set(todoList)
   })

   addTodo = (text: string) => {
      db.collection(path).add({ text, complete: false, created: new Date().toUTCString() })

   }
   updateTodoStatus = (id: string, complete: boolean) => {
      db.collection(path).doc(id).update({ complete })
   }
   removeTodo = (id: string) => {
      db.collection(path).doc(id).delete()
   }
})

