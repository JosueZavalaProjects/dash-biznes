// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCoOpLG2bORFmgCLMC8nBQPm4BwvCGWwdo",
  authDomain: "biznes2-58e51.firebaseapp.com",
  projectId: "biznes2-58e51",
  storageBucket: "biznes2-58e51.appspot.com",
  messagingSenderId: "70420505672",
  appId: "1:70420505672:web:f55d93139776ba6230a47d",
  measurementId: "G-JJJPYHB286",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

export const db = getFirestore(app);

export const auth = getAuth(app);
