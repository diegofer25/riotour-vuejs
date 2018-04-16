import { initializeApp } from '../node_modules/firebase'

const app = initializeApp({
  apiKey: 'AIzaSyD8GHRxHQEuF0t5Te10tc59OefQI9IawxM',
  authDomain: 'httpplaces-1520910240546.firebaseapp.com',
  databaseURL: 'https://httpplaces-1520910240546.firebaseio.com',
  projectId: 'httpplaces-1520910240546',
  storageBucket: 'httpplaces-1520910240546.appspot.com',
  messagingSenderId: '548838967227'
})

export const db = app.database()
export const favoritesRef = db.ref('favorites')
