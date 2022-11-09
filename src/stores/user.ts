// @ts-check
import { defineStore } from 'pinia'
import * as fb from '@/firebase/firebase'


export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
}

interface State {
  user: User | null
}

const lastState = localStorage.getItem('userState')
  ? JSON.parse(localStorage.getItem('userState') || '')
  : null

export const useUserStore = defineStore({
  id: 'user',

  state: (): State => ({
    user: lastState && lastState.user,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {

    async login(email: string, password: string) {
    
      const data = await fb.auth.signInWithEmailAndPassword(email, password)

      if (!data?.user) {
        window.$message.error('Merci de verifier vos informations.')
        return
      }

      await this.fetchUserProfile(data.user.uid)

    },

    async fetchUserProfile(userUid: string) {

      console.log(userUid)
      // @ts-ignore
      this.user = { uid: userUid, ...userProfile }

    },

    loginWithGoogle: fb.signInWithGoogle,

    async logout() {
      fb.auth.signOut()
      this.user = null
      useSignatureStore().resetSignees()
    },

    async register(name: string, email: string, password: string) {

      const data = await fb.auth.createUserWithEmailAndPassword(email, password)

      if (!data?.user) {
        window.$message.error('Merci de verifier vos informations.')
        return
      }

      await this.createProfile(data.user.uid, name, email)

    },

    async createProfile(userUid: string, name: string, email: string) {

      const payload = {
        displayName: name,
        email: email,
        photoUrl: '',
        uid: userUid,
      }

      await fb.usersCollection.add(payload)
      this.user = payload

    },
  },
})
