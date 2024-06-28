import { useEffect, useState } from "react";

import { Card } from "@/components/Card";
import { useDashboard } from "@/hooks/useDashboard";

import { GreenChart, RedChart } from "../../../../public/assets";

export const Cards = () => {
  const [inventorySpent, setInventorySpent] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [utilities, setUtilities] = useState<number>(0);

  const { GetTotalSales, GetDataProducts, GetTotalExpenses } = useDashboard();

  const handleGetProducts = async () => {
    const newProducts = await GetDataProducts();
    const inventoryAmount = newProducts?.length
      ? newProducts.reduce((a, b) => a + b)
      : 0;

    const inventoryLength = newProducts.length;

    setInventorySpent(inventoryAmount);
  };

  const handleGetSales = async () => {
    const newSales = await GetTotalSales();
    const salesAmount = newSales?.length ? newSales.reduce((a, b) => a + b) : 0;
    setTotalSales(salesAmount);
  };

  const handleCalculateUtilities = () => {
    const spents = inventorySpent + totalExpenses;
    const newUtilities = totalSales - spents;

    setUtilities(newUtilities);
  };

  const handleCalculateSpents = async () => {
    const responseExpenses = await GetTotalExpenses();
    const newExpenses = responseExpenses?.length
      ? responseExpenses.reduce((a, b) => a + b)
      : 0;

    setTotalExpenses(newExpenses);
  };

  useEffect(() => {
    handleGetProducts();
    handleGetSales();
  }, []);

  useEffect(() => {
    handleCalculateSpents();
  }, [inventorySpent]);

  useEffect(() => {
    handleCalculateUtilities();
  }, [inventorySpent, totalSales]);

  return (
    <>
      <Card
        amount={utilities}
        label={"Utilidades"}
        icon={GreenChart}
        link={"/activities"}
      />
      <Card
        amount={totalExpenses}
        label={"Total de Gastos"}
        icon={RedChart}
        link={"/activities"}
      />
      <Card
        amount={totalSales}
        label={"Ventas"}
        icon={GreenChart}
        link={"/activities"}
      />
    </>
  );
};
