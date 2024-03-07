import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { data as PurchaseData } from "@/constants/activities/purchases";
import { db } from "@/services/firebase";
import { Purchase } from "@/types/purchases";

import { DataTable } from "../../../DataTable";
import { columns } from "./table/columns";

require("dayjs/locale/es");

export const PurchasesTable = () => {
  const [sales, setSales] = useState<Purchase[]>(PurchaseData);
  const salesRef = collection(db, "sales");
  dayjs.locale("es");

  /*   const handleGetSales = async () => {
    const newProducts = await getDataSales();

    setSales(newProducts);
  };

  const getDataSales = async () => {
    const q = query(salesRef, orderBy("date", "desc"));
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

  useEffect(() => {
    handleGetSales();
  }, []); */

  return <DataTable columns={columns} data={sales} />;
};
