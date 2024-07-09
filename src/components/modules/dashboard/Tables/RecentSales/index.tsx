import { useEffect, useState } from "react";

import { useDashboard } from "@/hooks/useDashboard";
import { useDates } from "@/hooks/useDates";
import { formatCurrency } from "@/utils/common";
import { GreenLabel } from "@/components/ui/Labels";

type SalesObject = { date: string; total: number };

export const RecentSales = () => {
  const [daySales, setDaySales] = useState<number>(0);
  const [monthSales, setMonthSales] = useState<number>(0);
  const [yearSales, setYearSales] = useState<number>(0);
  const { GetSalesByDate } = useDashboard();
  const { GetCurrentYearDates, GetCurrentDayDates, GetCurrentMonthDates } =
    useDates();

  const getCurrentDaySales = async () => {
    const { startDate, endDate } = GetCurrentDayDates();

    const sales = await GetSalesByDate(startDate, endDate);
    const newSales = sumSales(sales);
    setDaySales(newSales);
  };

  const getCurrentMonthSales = async () => {
    const { startDate, endDate } = GetCurrentMonthDates();

    const sales = await GetSalesByDate(startDate, endDate);
    const newSales = sumSales(sales);
    setMonthSales(newSales);
  };

  const getCurrentYearSales = async () => {
    const { startDate, endDate } = GetCurrentYearDates();

    const sales = await GetSalesByDate(startDate, endDate);
    const newSales = sumSales(sales);
    setYearSales(newSales);
  };

  const sumSales = (salesArray: SalesObject[]) =>
    salesArray.length
      ? salesArray.map((sale) => sale.total).reduce((a, b) => a + b)
      : 0;

  useEffect(() => {
    getCurrentDaySales();
    getCurrentMonthSales();
    getCurrentYearSales();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="border-b-2 py-6">
        <div className="flex justify-between p-4 rounded-xl text-white bg-gradient-to-l from-third-green/70 to-pastel-light-green/70">
          <span>Ventas del día</span>
          <span className="font-semibold">
            Total: {formatCurrency(daySales)}
          </span>
        </div>
      </div>
      <div className="border-b-2 py-6">
        <div className="flex justify-between p-4">
          <span className="text-secondary-gray">Ventas del mes</span>
          <GreenLabel text={formatCurrency(monthSales)} />
        </div>
      </div>
      <div className="py-6">
        <div className="flex justify-between p-4">
          <span className="text-secondary-gray">Ventas del año</span>
          <GreenLabel text={formatCurrency(yearSales)} />
        </div>
      </div>
    </div>
  );
};
