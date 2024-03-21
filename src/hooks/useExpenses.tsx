import { useContext } from "react";

import dayjs from "dayjs";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { Expense } from "@/types/addExpense";
import { Purchase } from "@/types/purchases";
require("dayjs/locale/es");

export const useExpenses = () => {
  const expensesRef = collection(db, "expenses");
  const authCtx = useContext(AuthContext);
  dayjs.locale("es");

  const addExpense = async (expense: Expense) => {
    const { name, type, amount } = expense;

    const response = await addDoc(expensesRef, {
      name,
      type,
      amount,
      date: new Date().toString(),
      adminEmail: authCtx.email,
    });

    return response;
  };

  const getExpenses = async () => {
    const q = query(expensesRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: Purchase[] = [];

    qwerySnapshot.forEach((doc) => {
      const { name, type, amount, date } = doc.data();

      response.push({
        name: name || "",
        date: dayjs(date).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
        amount,
        type: type || "others",
      });
    });
    return response;
  };

  return { addExpense, getExpenses };
};
