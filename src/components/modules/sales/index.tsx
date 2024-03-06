import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";

import { data as SalesData } from "@/constants/sales";
import { db } from "@/services/firebase";
import { Sale } from "@/types/sales";

import { DataTable } from "../../DataTable";
import { columns } from "./table/columns";

export const SalesTable = () => {
  const [sales, setSales] = useState<Sale[]>(SalesData);

  const handleGetSales = async () => {
    const newProducts = await getDataSales();

    setSales(newProducts);
  };

  const getDataSales = async () => {
    const qwerySnapshot = await getDocs(collection(db, "sales"));

    const response: Sale[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total, paymentMethod } = doc.data();

      response.push({
        ticketNumber: `${Math.floor(Math.random() * 1000) + 1000}`,
        date: dayjs(Date().toString()).format("DD [de] MMMM YYYY"),
        total,
        method: paymentMethod || "cash",
      });
    });
    return response;
  };

  useEffect(() => {
    handleGetSales();
  }, []);

  return <DataTable columns={columns} data={sales} />;
};
