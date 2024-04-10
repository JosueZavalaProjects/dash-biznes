import { useEffect, useState } from "react";

import { data as PurchaseData } from "@/constants/activities/purchases";
import { useExpenses } from "@/hooks/useExpenses";
import { Purchase } from "@/types/purchases";

import { DataTable } from "../../../DataTable";
import useActivitiesDateState from "../states/activities-dates-state";
import { columns } from "./table/columns";

export const PurchasesTable = () => {
  const [expenses, setExpenses] = useState<Purchase[]>(PurchaseData);

  const { getExpensesByDate } = useExpenses();
  const { startDate, endDate } = useActivitiesDateState();

  const handleGetExpensesByDate = async (
    startDate: string,
    endDate: string
  ) => {
    const newExpenses = await getExpensesByDate(startDate, endDate);

    setExpenses(newExpenses);
  };

  useEffect(() => {
    if (!startDate && !endDate) return;

    handleGetExpensesByDate(startDate, endDate);
  }, [startDate, endDate]);

  return <DataTable columns={columns} data={expenses} />;
};
