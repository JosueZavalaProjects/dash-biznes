/** @format */
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Image from "next/image";

import BarChart from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Sales } from "@/components/dashboard/Sales";

const cardData: CardProps[] = [
  {
    label: "Utilidades Mensuales",
    amount: "$5,231.89",
    discription: "+20.1% desde el mes pasado",
    icon: DollarSign,
  },
  {
    label: "Ventas Mensuales",
    amount: "+12,234",
    discription: "+19% desde el mes pasado",
    icon: CreditCard,
  },
  {
    label: "Gastos Mensuales",
    amount: "-573",
    discription: "+201 desde el mes pasado",
    icon: Activity,
  },
  {
    label: "Inventarios",
    amount: "+ $234",
    discription: "+23 productos totales",
    icon: Users,
  },
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
          <p className="p-4 font-semibold">Utilidad general</p>

          <BarChart />
        </CardContent>
        <Sales />
        {/*     <CardContent className="flex justify-between gap-4">
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
        </CardContent> */}
      </section>
    </div>
  );
}
