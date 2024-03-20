import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithPassword = async (
  enteredEmail: string,
  enteredPassword: string
) => {
  const url = `${process.env.REACT_APP_FIREBASE_URL}/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  return createAuthCall(url, enteredEmail, enteredPassword);
};

export const signUp = async (enteredEmail: string, enteredPassword: string) => {
  const url = `${process.env.REACT_APP_FIREBASE_URL}/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  return createAuthCall(url, enteredEmail, enteredPassword);
};

export const signUpFirebase = async (
  enteredEmail: string,
  enteredPassword: string
) => {
  return createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
};

const createAuthCall = (
  url: string,
  enteredEmail: string,
  enteredPassword: string
) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
