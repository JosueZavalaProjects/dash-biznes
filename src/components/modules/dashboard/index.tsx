"use client";
import { useEffect, useState } from "react";

import BarChart, { graphColor } from "@/components/BarChart";
import { CardContent } from "@/components/LegacyCard";
import PageTitle from "@/components/PageTitle";
import { useDashboard } from "@/hooks/useDashboard";
import { useDates } from "@/hooks/useDates";
import { useProductMovements } from "@/hooks/useProductMovements";
import { GraphData, GraphResult } from "@/types/dashboard";
import { generateGraphData, groupByMoth } from "@/utils/dashboard";

import { Cards } from "./Cards";
import { BestSales } from "./Tables/BestSales";
import { ProductAlert } from "./Tables/ProductAlert";
import { RecentSales } from "./Tables/RecentSales";

export const Dashboard = () => {
  const [utilitiesData, setUtilitiesData] = useState<GraphData[]>([]);
  const [salesData, setSalesData] = useState<GraphData[]>([]);
  const [expensesData, setExpensesData] = useState<GraphData[]>([]);
  const [productsData, setProductsData] = useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { GetSalesByDate, GetExpensesByDate } = useDashboard();
  const { GetProductsAdditionsByDate } = useProductMovements();

  const { GetCurrentYearDates } = useDates();

  const GetGraphsData = async () => {
    setIsLoading(true);
    const { startDate, endDate } = GetCurrentYearDates();

    try {
      const salesResult = await GetSalesByDate(startDate, endDate);
      const expensesResult = await GetExpensesByDate(startDate, endDate);
      const productsResult = await GetProductsAdditionsByDate(
        startDate,
        endDate
      );

      const newSales = CreateGraphData(salesResult);
      const newExpenses = CreateGraphData(expensesResult);
      const newProducts = CreateGraphData(productsResult);
      const newUtilities = CreateUtilitiesGraphData(
        newSales,
        newExpenses,
        newProducts
      );

      setSalesData(newSales);
      setExpensesData(newExpenses);
      setProductsData(newProducts);
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
    expenses: GraphData[],
    inventory: GraphData[]
  ): GraphData[] => {
    const salesMonths = sales.map((sale) => sale.name);
    const expensesMonths = expenses.map((expense) => expense.name);
    const productsMonths = inventory.map((product) => product.name);

    const months = Array.from(
      new Set(salesMonths.concat(expensesMonths, productsMonths))
    );

    const utilities: GraphData[] = months.map((month) => {
      const sale = sales.find((sale) => sale.name === month);
      const expense = expenses.find((expense) => expense.name === month);
      const product = inventory.find((product) => product.name === month);
      const utility =
        (sale?.total || 0) - (expense?.total || 0) - (product?.total || 0);

      return { name: month, total: utility };
    });

    return utilities;
  };

  const CreateGraphData = (resultData: GraphResult[]): GraphData[] => {
    const groupData = groupByMoth(resultData);
    const finalData = generateGraphData(groupData);

    return finalData;
  };

  useEffect(() => {
    GetGraphsData();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3">
        <Cards />
      </section>
      <section className="grid w-full gap-4 transition-all lg:flex">
        <CardContent className="lg:w-2/3">
          <TitleBlue>Utilidad general</TitleBlue>

          <BarChart data={utilitiesData} isLoading={isLoading} />
        </CardContent>
        <CardContent className="lg:w-1/3">
          <TitleBlue>Resumen de Ventas</TitleBlue>

          <BarChart
            data={salesData}
            isLoading={isLoading}
            fillColor={graphColor.green}
          />
        </CardContent>
      </section>
      <section className="grid w-full gap-4 transition-all lg:flex">
        <CardContent className="lg:w-2/3">
          <TitleBlue>Productos más vendidos</TitleBlue>
          <BestSales />
        </CardContent>

        <CardContent className="lg:w-1/3">
          <TitleBlue>Ventas Recientes</TitleBlue>
          <RecentSales />
        </CardContent>
      </section>
      <section className="grid w-full gap-4 transition-all lg:flex">
        <CardContent className="lg:w-2/3">
          <TitleBlue>Resumen de Gastos</TitleBlue>
          <BarChart
            data={expensesData}
            isLoading={isLoading}
            fillColor={graphColor.red}
          />
        </CardContent>
        <CardContent className="lg:w-1/3">
          <TitleBlue>Alertas de Existencia</TitleBlue>
          <ProductAlert />
        </CardContent>
      </section>
    </div>
  );
};

const TitleBlue = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <p className="text-2xl font-semibold text-main-blue capitalize pb-4">
    {props.children}
  </p>
);
