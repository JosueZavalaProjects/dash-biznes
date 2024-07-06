"use client";

import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

import { CancelPeriod } from "@/types/stripePayments";
import { getCookie } from "cookies-next";

import { auth } from "./firebase";

export const getCheckoutUrl = async (app: FirebaseApp): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const priceId: string = process.env.NEXT_PUBLIC_PRICE_ID || "";

  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  let dataWithUrl: any;
  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    // Add a type to the data
    dataWithUrl = data as { url: string };
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
  } catch (error) {
    console.error(error);
  }

  return new Promise<string>((resolve, reject) => {
    if (dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};

export const getPremiumStatus = async (app: FirebaseApp) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise<CancelPeriod>((resolve, reject) => {
    const cancelPeriod: CancelPeriod = { cancelAtPeriodEnd: false };
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.docs.length === 0) {
          cancelPeriod.status = "noActive";
          resolve(cancelPeriod);
        } else {
          snapshot.docs.forEach((doc) => {
            const {
              cancel_at,
              cancel_at_period_end,
              status,
              current_period_end,
            } = doc.data();
            cancelPeriod.cancelAt = cancel_at;
            cancelPeriod.cancelAtPeriodEnd = cancel_at_period_end;
            cancelPeriod.status = status;
            cancelPeriod.currentPeriodEnd = current_period_end;
          });
          resolve(cancelPeriod);
        }
        unsubscribe();
      },
      reject
    );
  });
};

export const getCancelPeriodEnd = async (
  app: FirebaseApp
): Promise<CancelPeriod> => {
  const cancelPeriod: CancelPeriod = {
    cancelAtPeriodEnd: true,
    status: "noActive",
  };

  const userId = auth.currentUser?.uid || getCookie("uid");

  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(subscriptionsRef);

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const { cancel_at, cancel_at_period_end, status } = doc.data();
    cancelPeriod.cancelAtPeriodEnd = cancel_at_period_end;
    cancelPeriod.cancelAt = cancel_at;
    cancelPeriod.status = status;
  });

  return cancelPeriod;
};

/** TODO: Make it work, currently does not works */
export const disablePremiumStatus = async (app: FirebaseApp) => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);

  const docRef = doc(db, "customers", userId, "subscriptions");

  const newSubscription = {
    status: "inactive",
  };

  return await updateDoc(docRef, newSubscription);
};
