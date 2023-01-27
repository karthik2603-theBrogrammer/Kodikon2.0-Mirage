// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB35r7p6ntZSOyc5dJ7GKrVnH0spWCKTzU',
  authDomain: 'krish-idea.firebaseapp.com',
  projectId: 'krish-idea',
  storageBucket: 'krish-idea.appspot.com',
  messagingSenderId: '34102394162',
  appId: '1:34102394162:web:55e8be6d3ef369e8e06b2b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
