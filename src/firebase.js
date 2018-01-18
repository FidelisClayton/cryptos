import firebase from 'firebase'
import _ from 'lodash'

const config = {
  apiKey: 'AIzaSyCpFAtOGTMaILlWkRCYachGte-fKjM00U8',
  authDomain: 'cryptus-dff89.firebaseapp.com',
  databaseURL: 'https://cryptus-dff89.firebaseio.com',
  projectId: 'cryptus-dff89',
  storageBucket: 'cryptus-dff89.appspot.com',
  messagingSenderId: '776758617313'
};

firebase.initializeApp(config)

export const getUserUid = () =>
  _.get(auth, 'currentUser.uid', window.localStorage.getItem(STORAGE_KEY))

export const db = firebase.database()

export const portfolioRef = () => {
  const ref = `users/${getUserUid()}/portfolio`

  return db.ref().child(ref)
}

export const transactionsRef = () => {
  const ref = `users/${getUserUid()}/transactions`

  return db.ref().child(ref)
}

export const auth = firebase.auth()

export const STORAGE_KEY = 'CRYPTUS'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!window.localStorage.getItem(STORAGE_KEY)
}

export default firebase
