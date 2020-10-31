import firebase from "firebase/app"

import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"
import "firebase/performance"

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
   apiKey: FIREBASE_API_KEY,
   appId: FIREBASE_APP_ID,
   measurementId: FIREBASE_MEASUREMENT_ID,
   messagingSenderId: FIREBASE_MEASUREMENT_SENDER_ID,
   authDomain: "language-maker.firebaseapp.com",
   databaseURL: "https://language-maker.firebaseio.com",
   projectId: "language-maker",
   storageBucket: "language-maker.appspot.com",

}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()

export default firebase