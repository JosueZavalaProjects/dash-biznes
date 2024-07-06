import { useEffect, useState } from "react";

import { DataTable } from "@/components/DataTable";
import { Purchase } from "@/types/purchases";

import { ExpensesMobileColumns } from "./columns";

export const ExpensesMobileTable = () => {
  const MOCK_EXPENSES: Purchase[] = [
    { type: "personal", name: "test", amount: 4, date: "13/08/2023" },
    { type: "personal", name: "test", amount: 4, date: "13/08/2023" },
    { type: "personal", name: "test", amount: 4, date: "13/08/2023" },
    { type: "personal", name: "test", amount: 4, date: "13/08/2023" },
    { type: "personal", name: "test", amount: 4, date: "13/08/2023" },
  ];

  return <DataTable columns={ExpensesMobileColumns} data={MOCK_EXPENSES} />;
};
