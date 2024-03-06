"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { collection, getDocs, limit, query } from "firebase/firestore";

import { uesrSalesData } from "@/constants/dashboard";
import { db } from "@/services/firebase";

import { CardContent } from "../../Card";
import SalesCard, { SalesProps } from "../../SalesCard";

export const Sales = () => {
  const [userSales, setUserSales] = useState<SalesProps[]>(uesrSalesData);
  const [countSales, setCountSales] = useState<number>(0);

  const handleGetSales = async () => {
    const newSales = await getDataSales();
    setCountSales(newSales.length);
    setUserSales(newSales.splice(0, 5));
  };

  const getDataSales = async () => {
    const qwerySnapshot = await getDocs(collection(db, "sales"));

    const response: SalesProps[] = [];

    qwerySnapshot.forEach((doc) => {
      const { payment, total, products, date } = doc.data();

      /* console.log(new Date(date.nanoseconds));
      console.log(date); */
      response.push({
        ticketNumber: "Ticket 220",
        date: dayjs(Date().toString()).format("DD [de] MMMM YYYY"),
        saleAmount: total,
      });
    });
    return response;
  };

  useEffect(() => {
    handleGetSales();
  }, []);
  return (
    <CardContent className="flex justify-between gap-4">
      <section>
        <p>Ventas Recientes</p>
        <p className="text-sm text-gray-400">
          Hiciste {countSales} ventas el ultimo mes.
        </p>
      </section>
      {userSales.map((d, i) => (
        <SalesCard
          key={i}
          ticketNumber={d.ticketNumber}
          date={d.date}
          saleAmount={d.saleAmount}
        />
      ))}
    </CardContent>
  );
};
