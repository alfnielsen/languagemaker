import type firebase from "firebase/app"
import { writable } from 'svelte/store'

import { auth, googleProvider } from '../config/firebase'
import { authState } from 'rxfire/auth'

export const user = writable<firebase.User>(undefined)

const unsubscribe = authState(auth).subscribe(u => user.set(u))

export function signIn() {
   auth.signInWithPopup(googleProvider)
}

export function signOut() {
   auth.signOut()
}

