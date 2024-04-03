import { useContext } from "react";

import dayjs from "dayjs";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { SalesProps } from "@/components/SalesCard";
import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { Sale } from "@/types/sales";

export const useSales = () => {
  const salesRef = collection(db, "sales");
  const authCtx = useContext(AuthContext);

  const GetDataSales = async () => {
    const q = query(salesRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: Sale[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total, paymentMethod, date, ticket } = doc.data();

      response.push({
        id: doc.id,
        ticketNumber: ticket || "N/A",
        date: dayjs(date).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
        total,
        method: paymentMethod || "cash",
      });
    });
    return response;
  };

  const GetRecentSales = async () => {
    const q = query(salesRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: SalesProps[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total, date } = doc.data();

      response.push({
        ticketNumber: "Ticket 220",
        date: dayjs(date).format("DD [de] MMMM YYYY"),
        saleAmount: total,
      });
    });
    return response;
  };

  const DeleteSale = async (saleId: string) => {
    const response = await deleteDoc(doc(db, "sales", saleId));

    return response;
  };

  return { GetDataSales, GetRecentSales, DeleteSale };
};
