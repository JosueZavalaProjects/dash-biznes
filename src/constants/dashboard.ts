import { MdOutlineInventory } from "react-icons/md";

import { DollarSign, CreditCard, Activity } from "lucide-react";

import { CardProps } from "@/components/LegacyCard";
import { SalesProps } from "@/components/SalesCard";
import { BestSales } from "@/types/dashboard";

export const DUMMY_SPENTS = 4000;

export const uesrSalesData: SalesProps[] = [
  {
    ticketNumber: "Ticket 241",
    date: "13 Ago 2024",
    saleAmount: 1999,
  },
  {
    ticketNumber: "Ticket 242",
    date: "13 Ago 2024",
    saleAmount: 1999,
  },
  {
    ticketNumber: "Ticket 243",
    date: "13 Ago 2024",
    saleAmount: 39,
  },
  {
    ticketNumber: "ticket 244",
    date: "13 Ago 2024",
    saleAmount: 299,
  },
  {
    ticketNumber: "Tiecket 245",
    date: "13 Ago 2024",
    saleAmount: 39,
  },
];

export const CARD_DATA_KEYS = {
  UTILITIES: "utilidades mensuales",
  SALES: "ventas mensuales",
  SPENTS: "gastos mensuales",
  INVENTORY: "inventarios",
};

export const cardData: CardProps[] = [
  {
    label: CARD_DATA_KEYS.UTILITIES,
    amount: "$0.00",
    description: "",
    icon: DollarSign,
  },
  {
    label: CARD_DATA_KEYS.SALES,
    amount: "$0.00",
    description: "",
    icon: CreditCard,
    link: "/activities",
  },
  {
    label: CARD_DATA_KEYS.SPENTS,
    amount: "$0.00",
    description: "",
    icon: Activity,
    link: "/activities",
  },
  {
    label: CARD_DATA_KEYS.INVENTORY,
    amount: "$0.00",
    description: "",
    icon: MdOutlineInventory,
    link: "/inventory",
  },
];

const Mockdata = [
  {
    name: "Ene",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Abr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Ago",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dic",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const { v4: uuidv4 } = require("uuid");

const MOCK_BEST_SALES: BestSales[] = [
  {
    id: uuidv4(),
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
  {
    id: uuidv4(),
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 0,
  },
  {
    id: uuidv4(),
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
];

export const TOP_SALES = 5;
