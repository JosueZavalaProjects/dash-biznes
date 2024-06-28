import { Card } from "@/components/Card";

import { GreenChart, RedChart } from "../../../../public/assets";

type CardsProps = {
  utilities: number;
  expenses: number;
  sales: number;
};

export const Cards = ({ utilities, expenses, sales }: CardsProps) => {
  return (
    <>
      <Card
        amount={utilities}
        label={"Utilidades"}
        icon={GreenChart}
        link={"/activities"}
      />
      <Card
        amount={expenses}
        label={"Total de Gastos"}
        icon={RedChart}
        link={"/activities"}
      />
      <Card
        amount={sales}
        label={"Ventas"}
        icon={GreenChart}
        link={"/activities"}
      />
    </>
  );
};
