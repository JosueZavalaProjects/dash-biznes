"use client";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/common";

import useActivitiesState from "./modules/activites/Desktop/states/activities-state";

export type CardProps = {
  label: string;
  amount: number;
  icon: StaticImport;
  description?: string;
  link?: string;
};

export const Card = ({ label, amount, icon, description, link }: CardProps) => {
  const { setTabName } = useActivitiesState();
  const router = useRouter();

  const hanldeOnclick = () => {
    /* if (props.label === CARD_DATA_KEYS.SALES) setTabName(TAB_KEYS.SALES);
    if (props.label === CARD_DATA_KEYS.SPENTS) setTabName(TAB_KEYS.EXPENSES);

    if (props.link) router.push(props.link); */
  };

  return (
    <CardContent onClick={() => (link ? hanldeOnclick() : {})}>
      <div className="flex gap-2">
        <div className="flex flex-col w-3/4 gap-1">
          <p className="text-xl font-semibold text-main-blue capitalize">
            {label}
          </p>
          <h2 className="text-4xl font-semibold">
            {formatCurrency(amount, 0)}
            <span className="text-sm pl-2">MXN</span>
          </h2>
          <p className="text-xs text-gray-500">% Mes Anterior</p>
        </div>
        <div className="grid justify-items-center items-center w-1/4">
          <Image src={icon} width={64} height={34} alt="Chart" />
        </div>
      </div>
    </CardContent>
  );
};

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl p-8 shadow",
        props.className
      )}
    />
  );
}
