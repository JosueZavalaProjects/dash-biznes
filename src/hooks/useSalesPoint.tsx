import { useContext } from "react";

import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";

export const useSalesPoint = () => {
  const { paymentMethod, products, total } = useSalesPointState();
  const authCtx = useContext(AuthContext);

  const salesRef = collection(db, "sales");

  const _handleAddSaleToDB = async (
    ticketNumber: number,
    PaymentAmount?: number
  ) => {
    const userEmail = authCtx.email;
    let string = JSON.stringify({
      products,
      payment: PaymentAmount || total,
      total,
      paymentMethod,
      ticket: ticketNumber + 1,
      date: new Date().toString(),
      email: userEmail,
    });
    let newObj = JSON.parse(string);

    await addDoc(salesRef, newObj);
  };

  const _handleGetTicketLasSale = async () => {
    let ticketNumber = 0;
    const q = query(salesRef, orderBy("ticket", "desc"), limit(1));

    const qwerySnapshot = await getDocs(q);

    qwerySnapshot.forEach((doc) => {
      ticketNumber = doc.data().ticket;
    });
    return ticketNumber;
  };

  const CreateSale = async (PaymentAmount?: number) => {
    const ticketNumber = await _handleGetTicketLasSale();
    return await _handleAddSaleToDB(ticketNumber, PaymentAmount);
  };

  return { CreateSale };
};
