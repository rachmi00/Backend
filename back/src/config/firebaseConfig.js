// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider }     from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGzqXud-6pbGrBnZ76l0UL1XW4xs_Ptxo",
  authDomain: "harmony-f34c0.firebaseapp.com",
  projectId: "harmony-f34c0",
  storageBucket: "harmony-f34c0.appspot.com",
  messagingSenderId: "425995772377",
  appId: "1:425995772377:web:5bf4f8f9376ebc0c05f9c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage =getStorage(app)
