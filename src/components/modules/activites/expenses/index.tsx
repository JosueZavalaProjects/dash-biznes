import { useEffect, useState } from "react";

import { data as PurchaseData } from "@/constants/activities/purchases";
import { useExpenses } from "@/hooks/useExpenses";
import { Purchase } from "@/types/purchases";

import { DataTable } from "../../../DataTable";
import { columns } from "./table/columns";

export const PurchasesTable = () => {
  const [expenses, setExpenses] = useState<Purchase[]>(PurchaseData);

  const { getExpenses } = useExpenses();

  const handleGetSales = async () => {
    const newExpenses = await getExpenses();

    setExpenses(newExpenses);
  };

  useEffect(() => {
    handleGetSales();
  }, []);

  return <DataTable columns={columns} data={expenses} />;
};
