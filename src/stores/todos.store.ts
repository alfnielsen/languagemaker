
import { db } from '../config/firebase'
import { collectionData } from 'rxfire/firestore'
import { startWith } from 'rxjs/operators'

import { user } from './user.store'

let uid = ''
user.subscribe(value => { uid = value?.uid })

const path = `users/${uid}/todos`

// Query requires an index, see screenshot below
const query = db.collection(path).orderBy('created')

export const todos = collectionData(query, 'id').pipe(startWith([]))

export function addTodo(text: string) {
   db.collection(path).add({ uid, text, complete: false, created: Date.now() })
}

export function updateTodoStatus(id: string, complete: boolean) {
   db.collection(path).doc(id).update({ complete })
}

export function removeTodo(id: string) {
   db.collection(path).doc(id).delete()
}

