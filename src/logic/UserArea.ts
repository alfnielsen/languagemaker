import firebase from "firebase/app"
import { useAreaHook } from "react-redux-area"
import { authState } from 'rxfire/auth'
import { Subscription } from "rxjs"

import { store } from ".."
import AppAreaBase from "../config/AppAreaBase"
import { auth, googleProvider } from '../config/firebase'
import { AreaRegistration, AreaSelector } from "../config/ReduxAreaStore"

export interface IUserAreaState {
   user?: firebase.User,
   subscription?: Subscription // none raw data!
}

const area = AppAreaBase.Create<IUserAreaState>("User", {
   user: undefined
})

const subscribe = area
   .add("subscribe")
   .produce(draft => {
      if (!draft.subscription) {
         draft.subscription = authState(auth).subscribe(u => store.dispatch(
            updateLocal(u)
         ))
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
   .action((user?: firebase.User) => ({ user }))
   .produce((draft, { user }) => {
      draft.user = user
   })

const signIn = area
   .add("signIg")
   .action((doNotEnsureSubscribe = false) => ({ doNotEnsureSubscribe }))
   .produce((draft, { doNotEnsureSubscribe }) => {
      if (!doNotEnsureSubscribe) {
         subscribe.use(draft, {})
      }
      auth.signInWithPopup(googleProvider)
   })

const signOut = area
   .add("signOut")
   .action((unsubscribe = false) => ({ unsubscribe }))
   .produce((draft, { unsubscribe: unsub }) => {
      auth.signOut()
      if (unsub) {
         unsubscribe.use(draft, {})
      }
   })

const UserAreaActions = {
   subscribe,
   unsubscribe,
   updateLocalUser: updateLocal,
   signIn,
   signOut
}


export const useUser = () =>
   useAreaHook(UserAreaActions, AreaSelector(area))

AreaRegistration(area)