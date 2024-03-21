"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { TAB_KEYS } from "@/constants/activities/purchases";
import { uesrSalesData } from "@/constants/dashboard";
import { useSales } from "@/hooks/useSales";

import { CardContent } from "../../Card";
import SalesCard, { SalesProps } from "../../SalesCard";
import useActivitiesState from "../activites/states/activities-state";

export const Sales = () => {
  const [userSales, setUserSales] = useState<SalesProps[]>(uesrSalesData);
  const [countSales, setCountSales] = useState<number>(0);
  const { setTabName } = useActivitiesState();
  const router = useRouter();
  const { GetRecentSales } = useSales();

  const hanldeOnclick = () => {
    setTabName(TAB_KEYS.SALES);
    router.push("/activities");
  };

  const handleGetSales = async () => {
    const newSales = await GetRecentSales();
    setCountSales(newSales.length);
    setUserSales(newSales.splice(0, 5));
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
