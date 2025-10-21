// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrhjOQ5UraXM14p7qTbw7P8bFuIC2AGiI",
  authDomain: "portfolio-745b0.firebaseapp.com",
  projectId: "portfolio-745b0",
  storageBucket: "portfolio-745b0.firebasestorage.app",
  messagingSenderId: "1060856528945",
  appId: "1:1060856528945:web:8a8387e46777fa333d5510",
  measurementId: "G-C1MDRZB9M4"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
export { serverTimestamp };
