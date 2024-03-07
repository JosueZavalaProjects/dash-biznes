"use client";

import { SalesTable } from "@/components/modules/activites/sales";
import { NavOptions, TabContent } from "@/types/UI/common";

export const TAB_KEYS = {
  SALES: "sales",
  EXPENSES: "purchases",
};

export const CONTENTS: TabContent = {
  [TAB_KEYS.SALES]: <SalesTable />,
  [TAB_KEYS.EXPENSES]: <div>Gastos</div>,
};

export const ACTIVITIES_NAV: NavOptions[] = [
  { label: "Ventas", name: TAB_KEYS.SALES },
  { label: "Gastos", name: TAB_KEYS.EXPENSES },
];
