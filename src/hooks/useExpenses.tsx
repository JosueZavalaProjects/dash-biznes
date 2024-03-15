import dayjs from "dayjs";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/services/firebase";
import { Expense } from "@/types/addExpense";
import { Purchase } from "@/types/purchases";
require("dayjs/locale/es");

export const useExpenses = () => {
  const expensesRef = collection(db, "expenses");
  dayjs.locale("es");

  const addExpense = async (expense: Expense) => {
    const { name, type, amount } = expense;

    const response = await addDoc(expensesRef, {
      name,
      type,
      amount,
      date: new Date().toString(),
    });

    return response;
  };

  const getExpenses = async () => {
    const q = query(expensesRef, orderBy("date", "desc"));
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
