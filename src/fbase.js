import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD9kPlRAICZth8JkKv_ns2WYf64sd4ROHU',
  authDomain: 'fishroom-7e46a.firebaseapp.com',
  databaseURL: 'https://fishroom-7e46a-default-rtdb.firebaseio.com',
  projectId: 'fishroom-7e46a',
  storageBucket: 'fishroom-7e46a.appspot.com',
  messagingSenderId: '138928020365',
  appId: '1:138928020365:web:7a3105b659c63b94ecfbc4',
};
const app = initializeApp(firebaseConfig);

export const dbService = getFirestore();
export const authService = getAuth();
export const storageService = getStorage();
