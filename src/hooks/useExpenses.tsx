import { addDoc, collection } from "firebase/firestore";

import { db } from "@/services/firebase";
import { Expense } from "@/types/addExpense";

export const useExpenses = () => {
  const addExpense = async (expense: Expense) => {
    const { name, type, amount } = expense;

    const response = await addDoc(collection(db, "expenses"), {
      name,
      type,
      amount,
      date: new Date().toString(),
    });

    return response;
  };

  return { addExpense };
};
