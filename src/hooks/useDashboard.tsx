import { useContext } from "react";

import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { GraphResult } from "@/types/dashboard";

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

  const GetSalesByDate = async (startDate: string, endDate: string) => {
    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);

    const q = query(
      salesRef,
      where("adminEmail", "==", authCtx.email),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );
    const qwerySnapshot = await getDocs(q);

    const response: GraphResult[] = [];
    qwerySnapshot.forEach((doc) => {
      const { total, date } = doc.data();

      const { seconds } = date;
      const newDate = new Date(seconds * 1000);
      const _date = dayjs(newDate).format("YYYY-MM-DD");

      response.push({
        date: _date || "No Date",
        total,
      });
    });
    return response;
  };

  const GetExpensesByDate = async (startDate: string, endDate: string) => {
    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);

    const q = query(
      expensesRef,
      where("adminEmail", "==", authCtx.email),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );
    const qwerySnapshot = await getDocs(q);

    const response: GraphResult[] = [];

    qwerySnapshot.forEach((doc) => {
      const { amount, date } = doc.data();

      const { seconds } = date;
      const newDate = new Date(seconds * 1000);
      const _date = dayjs(newDate).format("YYYY-MM-DD");

      response.push({
        date: _date || "No Date",
        total: amount,
      });
    });

    return response;
  };

  return {
    GetTotalSales,
    GetDataProducts,
    GetTotalExpenses,
    GetSalesByDate,
    GetExpensesByDate,
  };
};
