import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCl9FmgTjW66CiflmYvsuWFYpRjFuRY6l0',
  authDomain: 'finnsdetplats.firebaseapp.com',
  projectId: 'finnsdetplats',
  storageBucket: 'finnsdetplats.appspot.com',
  messagingSenderId: '563807214405',
  appId: '1:563807214405:web:f8003b55944f228cbffc2c',
  measurementId: 'G-D97MWHSPGX',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
