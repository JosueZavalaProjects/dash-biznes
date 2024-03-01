/** @format */

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";

const cardData: CardProps[] = [
  {
    label: "Ingresos totales",
    amount: "$45,231.89",
    discription: "+20.1% desde el mes pasado",
    icon: DollarSign
  },
  {
    label: "Inventarios",
    amount: "+2350",
    discription: "+180.1% desde el mes pasado",
    icon: Users
  },
  {
    label: "Ventas Mensuales",
    amount: "+12,234",
    discription: "+19% desde el mes pasado",
    icon: CreditCard
  },
  {
    label: "Activos ahora",
    amount: "+573",
    discription: "+201 desde el mes pasado",
    icon: Activity
  }
];

const uesrSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Pedro Lopez",
    email: "pedro.lopez@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Isabel Gomez",
    email: "isabel.gomezn@email.com",
    saleAmount: "+$39.00"
  },
  {
    name: "Fernando Aguero",
    email: "fernando@email.com",
    saleAmount: "+$299.00"
  },
  {
    name: "Sofia Martinez",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">visión general</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Ventas Recientes</p>
            <p className="text-sm text-gray-400">
              Hiciste 264 ventas el ultimo mes.
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
