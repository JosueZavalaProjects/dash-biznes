import { collection, getDocs } from "firebase/firestore";

import { db } from "@/services/firebase";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export const useDashboard = () => {
  const salesRef = collection(db, "sales");
  const productsRef = collection(db, "products");
  const expensesRef = collection(db, "expenses");
  const authCtx = useContext(AuthContext);

  const getTotalSales = async () => {
    const qwerySnapshot = await getDocs(salesRef);

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total } = doc.data();
      response.push(total);
    });
    return response;
  };

  const getTotalExpenses = async () => {
    const qwerySnapshot = await getDocs(expensesRef);

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { amount } = doc.data();
      response.push(amount);
    });
    return response;
  };

  const getDataProducts = async () => {
    const qwerySnapshot = await getDocs(productsRef);

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { purchasePrice, inventory } = doc.data();

      response.push(purchasePrice * inventory);
    });
    return response;
  };

  return { getTotalSales, getDataProducts, getTotalExpenses };
};
