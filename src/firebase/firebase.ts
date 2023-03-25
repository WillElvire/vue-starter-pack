import { User } from '@/stores/user'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

const provider = new firebase.auth.GoogleAuthProvider()


/*************** define your collection here *********************/

export const usersCollection = firestore.collection('users')
export const documentsCollection = firestore.collection('documentsToSign')

/*********  define your firebase function here  ********/


// google connection
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

//sample of firebase function
export const getUserDocument = async (uid:string) => {
  if (!uid) return null

  try {
    const userDocument = await usersCollection
      .where('uid', '==', uid)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const matches = querySnapshot.docs.map((d) => d.data())
          return matches[0] // We know there is one doc in the querySnapshot
        } else {
          console.log('No document corresponding to the query!')
          return null
        }
      })
    return { uid, ...userDocument }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}




