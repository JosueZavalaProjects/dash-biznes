import React from "react";

import Image from "next/image";

import { formatCurrency } from "@/utils/common";

import { WalletPlus } from "../../public/assets";

export type SalesProps = {
  ticketNumber: string;
  date: string;
  saleAmount: number;
};

export default function SalesCard(props: SalesProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-12 w-12 rounded-full bg-gray-100 p-1">
          <Image width={200} height={200} src={WalletPlus} alt="wallet" />
        </div>
        <div className="text-sm">
          <p>{props.ticketNumber}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.date}
          </div>
        </div>
      </section>
      <p>{formatCurrency(props.saleAmount)}</p>
    </div>
  );
}
