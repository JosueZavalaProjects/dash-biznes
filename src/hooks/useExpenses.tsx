import { useContext } from "react";

import dayjs from "dayjs";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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
      date: Timestamp.fromDate(new Date()),

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
      const { seconds } = date;
      const newDate = new Date(seconds * 1000);
      const _date = dayjs(newDate).format("DD [de] MMMM YYYY HH:mm:ss");

      response.push({
        name: name || "",
        date: _date || "No Date",
        amount,
        type: type || "others",
      });
    });
    return response;
  };

  return { addExpense, getExpenses };
};
