"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { TAB_KEYS } from "@/constants/activities/purchases";
import { uesrSalesData } from "@/constants/dashboard";
import { db } from "@/services/firebase";

import { CardContent } from "../../Card";
import SalesCard, { SalesProps } from "../../SalesCard";
import useActivitiesState from "../activites/states/activities-state";

export const Sales = () => {
  const [userSales, setUserSales] = useState<SalesProps[]>(uesrSalesData);
  const [countSales, setCountSales] = useState<number>(0);
  const { setTabName } = useActivitiesState();
  const router = useRouter();

  const hanldeOnclick = () => {
    setTabName(TAB_KEYS.SALES);
    router.push("/activities");
  };

  const handleGetSales = async () => {
    const newSales = await getDataSales();
    setCountSales(newSales.length);
    setUserSales(newSales.splice(0, 5));
  };

  const getDataSales = async () => {
    const qwerySnapshot = await getDocs(collection(db, "sales"));

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

  useEffect(() => {
    handleGetSales();
  }, []);

  return (
    <CardContent
      className="flex justify-between gap-4 cursor-pointer"
      onClick={() => hanldeOnclick()}
    >
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
