import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

import { CardProps } from "@/components/Card";
import { SalesProps } from "@/components/SalesCard";

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
    description: "+20.1% desde el mes pasado",
    icon: DollarSign,
  },
  {
    label: CARD_DATA_KEYS.SALES,
    amount: "$0.00",
    description: "+19% desde el mes pasado",
    icon: CreditCard,
    link: "/activities",
  },
  {
    label: CARD_DATA_KEYS.SPENTS,
    amount: "$0.00",
    description: "+201 desde el mes pasado",
    icon: Activity,
    link: "/activities",
  },
  {
    label: CARD_DATA_KEYS.INVENTORY,
    amount: "$0.00",
    description: "+23 productos totales",
    icon: Users,
    link: "/inventory",
  },
];
