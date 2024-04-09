"use client";
import { useEffect, useState } from "react";

import BarChart from "@/components/BarChart";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { MONTH_LABELS } from "@/constants/activities";
import { useDashboard } from "@/hooks/useDashboard";
import { useDates } from "@/hooks/useDates";
import { GraphData, GraphResult, GroupTotals } from "@/types/dashboard";

import { Cards } from "./Cards";
import { Sales } from "./Sales";

export const Dashboard = () => {
  const [utilitiesData, setUtilitiesData] = useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { GetSalesByDate } = useDashboard();
  const { GetCurrentYearDates } = useDates();

  const GetGraphsData = async () => {
    setIsLoading(true);
    const { startDate, endDate } = GetCurrentYearDates();

    try {
      /* console.log({ startDate });
      console.log({ endDate }); */
      const salesResult = await GetSalesByDate(startDate, endDate);
      /* console.log({ salesResult }); */
      const newUtilites = CreateGraphData(salesResult);
      /* console.log({ newUtilites }); */

      setUtilitiesData(newUtilites);
    } catch {
      throw new Error("Error al cargar informacion de gráficas");
    } finally {
      setIsLoading(false);
    }
  };

  const CreateGraphData = (resultData: GraphResult[]): GraphData[] => {
    const groupData = groupByMoth(resultData);
    const finalData = generateGraphData(groupData);

    return finalData;
  };

  const groupByMoth = (myArray: GraphResult[]) => {
    const groups = myArray.reduce(function (r: GroupTotals, o) {
      const { date, total } = o;
      const m = date.split("-")[1];
      r[`${m}`] ? r[m].push(total) : (r[m] = [total]);
      return r;
    }, {});

    return groups;
  };

  const generateGraphData = (groupData: GroupTotals) => {
    const data: GraphData[] = [];
    for (const property in groupData) {
      const total = groupData[property].reduce(
        (current, next) => current + next
      );
      const month = MONTH_LABELS[+property - 1].slice(0, 3);
      data.push({ name: month, total });
      /* console.log(`${name}: ${total}`); */
    }
    return data;
    /* console.log(data); */
  };

  useEffect(() => {
    GetGraphsData();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <Cards />
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Utilidad general</p>
          <BarChart data={utilitiesData} isLoading={isLoading} />
        </CardContent>
        <Sales />
      </section>
    </div>
  );
};
