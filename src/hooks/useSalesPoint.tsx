import { useContext } from "react";

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { Product as ProductType } from "@/types/salesPoint";

export const useSalesPoint = () => {
  const { paymentMethod, products, total } = useSalesPointState();
  const authCtx = useContext(AuthContext);

  const salesRef = collection(db, "sales");
  const productssRef = collection(db, "products");

  const _handleAddSaleToDB = async (
    ticketNumber: number,
    PaymentAmount?: number
  ) => {
    let newObj = {
      products,
      payment: PaymentAmount || total,
      total,
      paymentMethod,
      ticket: ticketNumber + 1,
      date: Timestamp.fromDate(new Date()),
      adminEmail: authCtx.email,
    };

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

  const GetDataProducts = async () => {
    const q = query(productssRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: ProductType[] = [];
    qwerySnapshot.forEach((doc) => {
      const { category, subcategory, inventory, name, price } = doc.data();
      response.push({
        id: doc.id,
        name,
        price,
        category,
        inventory,
        subcategory,
      });
    });

    return response;
  };

  const CreateSale = async (PaymentAmount?: number) => {
    const ticketNumber = await _handleGetTicketLasSale();
    return await _handleAddSaleToDB(ticketNumber, PaymentAmount);
  };

  const UpdateSale = async (id: string) => {
    let newObj = {
      products,
      payment: total,
      total,
      paymentMethod,
      date: Timestamp.fromDate(new Date()),
      adminEmail: authCtx.email,
    };

    const docRef = doc(db, "sales", id);

    return await updateDoc(docRef, newObj);
  };

  return { CreateSale, GetDataProducts, UpdateSale };
};
