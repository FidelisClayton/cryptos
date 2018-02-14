import firebase from 'firebase'
import _ from 'lodash'
import moment from 'moment'

const config = {
  apiKey: 'AIzaSyCpFAtOGTMaILlWkRCYachGte-fKjM00U8',
  authDomain: 'cryptus-dff89.firebaseapp.com',
  databaseURL: 'https://cryptus-dff89.firebaseio.com',
  projectId: 'cryptus-dff89',
  storageBucket: 'cryptus-dff89.appspot.com',
  messagingSenderId: '776758617313'
};

firebase.initializeApp(config)

export const STORAGE_KEY = 'CRYPTUS'

export const db = firebase.database()
export const storage = firebase.storage()
export const auth = firebase.auth()
export const googleAuth = new firebase.auth.GoogleAuthProvider()

export const getUserUid = () =>
  _.get(auth, 'currentUser.uid', window.localStorage.getItem(STORAGE_KEY))

export const coinsRef = storage.ref('coins')

export const portfolioRef = () => {
  const ref = `portfolios/${getUserUid()}`

  return db.ref().child(ref)
}

export const transactionsRef = () => {
  const ref = `transactions/${getUserUid()}`

  return db.ref().child(ref)
}

export const performanceRef = () => {
  const ref = `performance-chart/${getUserUid()}/overall`
  const yearAgo = moment().subtract(1, 'years').format('YYYY-MM-DD')

  return db.ref(ref).orderByKey().startAt(yearAgo)
}

export const userRef = uid => {
  const ref = `users/${uid || getUserUid()}`

  return db.ref(ref)
}

export const accountSummary = () => {
  const ref = `performance-chart/${getUserUid()}/overall`

  return db.ref(ref).orderByKey().limitToLast(1)
}

export const isAuthenticated = () => {
  return !!auth.currentUser || !!window.localStorage.getItem(STORAGE_KEY)
}

export default firebase
