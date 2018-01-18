import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCpFAtOGTMaILlWkRCYachGte-fKjM00U8',
  authDomain: 'cryptus-dff89.firebaseapp.com',
  databaseURL: 'https://cryptus-dff89.firebaseio.com',
  projectId: 'cryptus-dff89',
  storageBucket: 'cryptus-dff89.appspot.com',
  messagingSenderId: '776758617313'
};

firebase.initializeApp(config)

export const db = firebase.database()
export const portfolioRef = db.ref().child('portfolio')
export const transactionsRef = db.ref().child('transactions')

export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()

export const STORAGE_KEY = 'KEY_FOR_LOCAL_STORAGE'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!window.localStorage.getItem(STORAGE_KEY)
}

export default firebase
