import { useContext } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";

export const useDashboard = () => {
  const salesRef = collection(db, "sales");
  const productsRef = collection(db, "products");
  const expensesRef = collection(db, "expenses");
  const authCtx = useContext(AuthContext);

  const GetTotalSales = async () => {
    const q = query(salesRef, where("adminEmail", "==", authCtx.email));

    const qwerySnapshot = await getDocs(q);

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total } = doc.data();
      response.push(total);
    });
    return response;
  };

  const GetTotalExpenses = async () => {
    const q = query(expensesRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { amount } = doc.data();
      response.push(amount);
    });
    return response;
  };

  const GetDataProducts = async () => {
    const q = query(productsRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { purchasePrice, inventory } = doc.data();

      response.push(purchasePrice * inventory);
    });
    return response;
  };

  return { GetTotalSales, GetDataProducts, GetTotalExpenses };
};
