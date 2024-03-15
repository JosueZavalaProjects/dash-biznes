"use client";
import React from "react";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { TAB_KEYS } from "@/constants/activities/purchases";
import { CARD_DATA_KEYS } from "@/constants/dashboard";
import { cn } from "@/lib/utils";

import useActivitiesState from "./modules/activites/states/activities-state";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
  link?: string;
};

export default function Card(props: CardProps) {
  const { setTabName } = useActivitiesState();
  const router = useRouter();

  const hanldeOnclick = () => {
    if (props.label === CARD_DATA_KEYS.SALES) setTabName(TAB_KEYS.SALES);
    if (props.label === CARD_DATA_KEYS.SPENTS) setTabName(TAB_KEYS.EXPENSES);

    if (props.link) router.push(props.link);
  };

  return (
    <CardContent
      className={cn("", { "cursor-pointer": props.link })}
      onClick={() => (props.link ? hanldeOnclick() : {})}
    >
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm capitalize">{props.label}</p>
        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
