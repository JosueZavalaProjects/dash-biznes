"use client";
import { useEffect, useState } from "react";

import { BlueAddButton } from "@/components/ui/buttons/blueButton";
import { SimpleTabs } from "@/components/ui/simpleTabs";
import { TabSelection } from "@/components/ui/tabSelection";
import { TABS_LABELS, TAB_KEYS } from "@/constants/activities/purchases";
import { useDates } from "@/hooks/useDates";
import { useExpenses } from "@/hooks/useExpenses";
import { useSalesTables } from "@/hooks/useSalesTables";
import { datesType } from "@/types/activities";
import { Purchase } from "@/types/purchases";
import { formatCurrency } from "@/utils/common";

import { SelectMonths } from "./components/selectMonths";
import useActivitiesDateState from "./states/activities-dates-state";
import useActivitiesState from "./states/activities-state";

export default function ActivitiesDesktop() {
  const { GetLastDate, GetCurrentDate } = useDates();
  const [total, setTotal] = useState<number>(0);
  const [expenses, setExpenses] = useState<Purchase[]>([]);

  const { tabsContents, menuNav, tabName, setTabName } = useActivitiesState();
  const { sales, HandleGetSalesByDate } = useSalesTables();
  const { GetCurrentDayDates } = useDates();
  const { setStartDate, setEndDate } = useActivitiesDateState();
  const { getExpensesByDate } = useExpenses();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const startDate = e.target.value;
    const lastDate = GetLastDate(startDate);

    setStartDate(startDate);
    setEndDate(lastDate);
  };

  const handleGetExpensesByDate = async (
    startDate: string,
    endDate: string
  ) => {
    const newExpenses = await getExpensesByDate(startDate, endDate);

    setExpenses(newExpenses);
  };

  const generateInitialDates = () => {
    const startDate = GetCurrentDate();
    const endDate = GetLastDate(startDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCalculateTotalSales = () =>
    sales.length ? sales.map((sale) => sale.total).reduce((a, b) => a + b) : 0;

  const handleCalculateTotalExpenses = () =>
    expenses.length
      ? expenses.map((expense) => expense.amount).reduce((a, b) => a + b)
      : 0;

  useEffect(() => {
    generateInitialDates();
  }, []);

  useEffect(() => {
    setTotal(handleCalculateTotalSales());
  }, [sales]);

  useEffect(() => {
    setTotal(handleCalculateTotalExpenses());
  }, [expenses]);

  useEffect(() => {
    const { startDate, endDate }: datesType = GetCurrentDayDates();

    if (!startDate && !endDate) return;

    if (tabName === TAB_KEYS.SALES) HandleGetSalesByDate(startDate, endDate);
    if (tabName === TAB_KEYS.EXPENSES)
      handleGetExpensesByDate(startDate, endDate);
  }, [tabName]);

  return (
    <div className="flex flex-col gap-5 w-full xl:max-w-[100rem] xl:mx-auto">
      <div className="grid w-full pt-4">
        <section className="flex flex-col gap-4 lg:flex-row">
          <div className="w-1/4">
            <TabSelection
              navItems={menuNav}
              tabName={tabName}
              setTabName={setTabName}
            />
          </div>
          <div className="flex justify-between lg:w-3/4">
            <div
              className={`flex items-center text-center p-2 rounded-lg  text-white
                ${
                  tabName === TAB_KEYS.SALES
                    ? "bg-primary-green"
                    : "bg-pastel-light-red"
                }
                `}
            >
              {TABS_LABELS[tabName]} del dia
              <span className="pl-2 font-bold">
                Total: {formatCurrency(total)}
              </span>
            </div>
            <div className="flex gap-2">
              <BlueAddButton
                link={
                  tabName === TAB_KEYS.SALES ? "/salesPoint" : "/addExpense"
                }
              />
              <SelectMonths handleChange={handleChange} />
            </div>
          </div>
        </section>

        <SimpleTabs tabsContents={tabsContents} tabNameSelected={tabName} />
      </div>
    </div>
  );
}
