import firebase from "firebase/app"

import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"
import "firebase/performance"

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
   apiKey: "AIzaSyAT-ojQq9bcmk0qlYdspQsazRKaI65nRc4",
   appId: "1:630959018553:web:5f2a26ddf6ba2e0ae3f3e8",
   measurementId: "G-LK3VN384VP",
   messagingSenderId: "630959018553",
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