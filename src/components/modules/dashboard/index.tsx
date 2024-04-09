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
  const [salesData, setSalesData] = useState<GraphData[]>([]);
  const [expensesData, setExpensesData] = useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { GetSalesByDate, GetExpensesByDate } = useDashboard();
  const { GetCurrentYearDates } = useDates();

  const GetGraphsData = async () => {
    setIsLoading(true);
    const { startDate, endDate } = GetCurrentYearDates();

    try {
      const salesResult = await GetSalesByDate(startDate, endDate);
      const expensesResult = await GetExpensesByDate(startDate, endDate);

      const newSales = CreateGraphData(salesResult);
      const newExpenses = CreateGraphData(expensesResult);
      const newUtilities = CreateUtilitiesGraphData(newSales, newExpenses);

      setSalesData(newSales);
      setExpensesData(newExpenses);
      setUtilitiesData(newUtilities);
    } catch (e) {
      const result = (e as Error).message;

      throw new Error(result);
    } finally {
      setIsLoading(false);
    }
  };

  const CreateUtilitiesGraphData = (
    sales: GraphData[],
    expenses: GraphData[]
  ): GraphData[] => {
    const salesMonths = sales.map((sale) => sale.name);
    const expensesMonths = expenses.map((expense) => expense.name);

    const months = Array.from(new Set(salesMonths.concat(expensesMonths)));

    const utilities: GraphData[] = months.map((month) => {
      const sale = sales.find((sale) => sale.name === month);
      const expense = expenses.find((expense) => expense.name === month);
      const utility = (sale?.total || 0) - (expense?.total || 0);

      return { name: month, total: utility };
    });

    return utilities;
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
    }
    return data;
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
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Resumen de Gastos</p>
          <BarChart
            data={expensesData}
            isLoading={isLoading}
            fillColor="#F05F40"
          />
        </CardContent>
        <CardContent>
          <p className="p-4 font-semibold">Resumen de Ventas</p>
          <BarChart
            data={salesData}
            isLoading={isLoading}
            fillColor="#8FC93A"
          />
        </CardContent>
      </section>
    </div>
  );
};
