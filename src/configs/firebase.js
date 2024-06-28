// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import {  } from 'geofire-common'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQUy7ez0FjCuMcFYDUVaPVTwh__G_fwx4",
  authDomain: "eperdemic-tp-6.firebaseapp.com",
  projectId: "eperdemic-tp-6",
  storageBucket: "eperdemic-tp-6.appspot.com",
  messagingSenderId: "680596970964",
  appId: "1:680596970964:web:8c44bcfe16b2078b484a41",
  measurementId: "G-H92ZR2T2K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const databaseFirestore = getFirestore(app);
const databaseRealtime = getDatabase(app);

export { auth, provider, databaseFirestore, databaseRealtime };