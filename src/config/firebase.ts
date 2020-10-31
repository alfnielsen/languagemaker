
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/performance"
import "firebase/analytics"

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
   apiKey: "AIzaSyAQUPMLL6Cl5eYXKxFZZKmMHxtNyyGhb-4",
   authDomain: "view-first.firebaseapp.com",
   databaseURL: "https://view-first.firebaseio.com",
   projectId: "view-first",
   storageBucket: "view-first.appspot.com",
   messagingSenderId: "1018864878674",
   appId: "1:1018864878674:web:9cfaddca1b1d399ad00b8b",
   measurementId: "G-QYMV6P8K48"
}
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()

export default firebase