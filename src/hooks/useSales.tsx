import { useContext } from "react";

import dayjs from "dayjs";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { SalesProps } from "@/components/SalesCard";
import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { Sale } from "@/types/sales";
import useActivitiesState from "@/components/modules/activites/states/activities-state";

export const useSales = () => {
  const salesRef = collection(db, "sales");
  const authCtx = useContext(AuthContext);
  /* const { startDate, endDate } = useActivitiesState(); */

  const GetDataSales = async () => {
    const q = query(salesRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: Sale[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total, paymentMethod, date, ticket } = doc.data();

      const { seconds } = date;
      const newDate = new Date(seconds * 1000);

      response.push({
        id: doc.id,
        ticketNumber: ticket || "N/A",
        date: dayjs(newDate).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
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

  const GetSaleByID = async (id: string) => {
    const docRef = doc(db, "sales", id);
    const querySnapshot = await getDoc(docRef);

    return querySnapshot.data();
  };

  const DeleteSale = async (saleId: string) => {
    const response = await deleteDoc(doc(db, "sales", saleId));

    return response;
  };

  const GetSalesByDate = async (startDate: string, endDate: string) => {
    /* const principio = "2020/07/01";
    const final = "2024/07/31"; */
    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);
    /* startOfDay.setHours(0, 0, 0, 0); */

    const q = query(
      salesRef,
      where("adminEmail", "==", authCtx.email),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );
    const qwerySnapshot = await getDocs(q);

    const response: Sale[] = [];
    qwerySnapshot.forEach((doc) => {
      const { total, paymentMethod, date, ticket } = doc.data();

      /* console.log(date); */
      const { seconds } = date;
      const newDate = new Date(seconds * 1000);
      /* newDate.setHours(0, 0, seconds, nanoseconds); */

      response.push({
        id: doc.id,
        ticketNumber: ticket || "N/A",
        date: newDate,
        total,
        method: paymentMethod || "cash",
      });
    });
    return response;

    /* dc.getDocument()
      .getReference()
      .collection("partidos")
      .where("fecha", ">=", principio)
      .where("fecha", "<=", final); */
  };

  return {
    GetDataSales,
    GetRecentSales,
    DeleteSale,
    GetSaleByID,
    GetSalesByDate,
  };
};
