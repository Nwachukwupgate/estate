// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCywcfFkcF3QCGAY-6n97hfADtJrOGtaZg",
  authDomain: "ola-project-e947d.firebaseapp.com",
  projectId: "ola-project-e947d",
  storageBucket: "ola-project-e947d.appspot.com",
  messagingSenderId: "518977024520",
  appId: "1:518977024520:web:24e57cbddcca02d65017bd",
  measurementId: "G-2R9Z2FLND8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const imgDb= getStorage(app)