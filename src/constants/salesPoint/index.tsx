"use client";

import { Order } from "@/components/modules/salesPoint/Mobile/order";
import { Total } from "@/components/modules/salesPoint/Mobile/total";
import { NavOptions, TabContent } from "@/types/UI/common";
export const TAB_KEYS = {
  ORDER: "order",
  TOTAL: "total",
};

export const CONTENTS: TabContent = {
  [TAB_KEYS.ORDER]: <Order />,
  [TAB_KEYS.TOTAL]: <Total />,
};

export const SALES_POINT_NAV: NavOptions[] = [
  { label: "Order", name: TAB_KEYS.ORDER },
  { label: "Total", name: TAB_KEYS.TOTAL },
];
export const BG_COLORS = [
  "bg-gradient-to-b from-pastel-brown to-pastel-light-brown/40",
  "bg-gradient-to-b from-pastel-blue to-pastel-light-blue",
  "bg-gradient-to-b from-pastel-green to-pastel-light-green/40",
  "bg-gradient-to-b from-pastel-gray to-white",
  "bg-gradient-to-b from-pastel-red to-pastel-light-red/40",
  "bg-gradient-to-b from-pastel-purple to-pastel-light-purple",
  "bg-gradient-to-b from-pastel-indigo to-pastel-light-indigo/40",
  "bg-gradient-to-b from-pastel-lime to-pastel-light-lime/40",
  "bg-gradient-to-b from-pastel-yellow to-pastel-light-yellow/40",
  "bg-gradient-to-b from-pastel-cian to-pastel-light-cian/40",
  "bg-gradient-to-b from-pastel-pink to-pastel-light-pink/40",
];
