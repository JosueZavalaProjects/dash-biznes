"use client";

import { PurchasesTable } from "@/components/modules/activites/expenses";
import { SalesTable } from "@/components/modules/activites/sales";
import { Purchase } from "@/types/purchases";
import { NavOptions, TabContent } from "@/types/UI/common";

export const TAB_KEYS = {
  SALES: "sales",
  EXPENSES: "purchases",
};

export const CONTENTS: TabContent = {
  [TAB_KEYS.SALES]: <SalesTable />,
  [TAB_KEYS.EXPENSES]: <PurchasesTable />,
};

export const ACTIVITIES_NAV: NavOptions[] = [
  { label: "Ventas", name: TAB_KEYS.SALES },
  { label: "Gastos", name: TAB_KEYS.EXPENSES },
];

export const data: Purchase[] = [
  {
    name: "Gasto",
    type: "financial",
    date: "2023-01-15",
    amount: 500,
  },
];
