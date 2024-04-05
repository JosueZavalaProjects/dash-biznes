import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

export const signUpFirebase = async (
  enteredEmail: string,
  enteredPassword: string
) => {
  return createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
};

export const signInFirebase = async (
  enteredEmail: string,
  enteredPassword: string
) => {
  return signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
};

export const passwordReset = async (enteredEmail: string) => {
  return sendPasswordResetEmail(auth, enteredEmail);
};
