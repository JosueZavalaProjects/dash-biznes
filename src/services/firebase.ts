// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC2IPxZhbiZlgC5hDNccSXXlwIehdvg4_U",
  authDomain: "buzines-2.firebaseapp.com",
  projectId: "buzines-2",
  storageBucket: "buzines-2.appspot.com",
  messagingSenderId: "740697164392",
  appId: "1:740697164392:web:42cb709bcd5171645189dd",
  measurementId: "G-95MSC0S2Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

export const initFirebase = () => {
  return app;
};

export const db = getFirestore(app);

export const auth = getAuth(app);
