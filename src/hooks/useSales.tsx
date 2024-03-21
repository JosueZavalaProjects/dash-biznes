import { useContext } from "react";

import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";

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
        ticketNumber: ticket || "N/A",
        date: dayjs(date).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
        total,
        method: paymentMethod || "cash",
      });
    });
    return response;
  };

  return { GetDataSales };
};
