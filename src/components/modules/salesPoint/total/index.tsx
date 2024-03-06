"use client";
import { useState } from "react";

import dayjs from "dayjs";
require("dayjs/locale/es");

import { ContainerCard } from "@/components/ui/containerCard";
import Text from "@/components/ui/text";

import useSalesPointState from "../states/sales-point-state";
import { Modals } from "./components/modals";
import { TotalTable } from "./components/table";

export const Total = () => {
  const [show, setShow] = useState<boolean>(false);
  const { products, total } = useSalesPointState();

  dayjs.locale("es");

  return (
    <ContainerCard>
      <Modals show={show} setShow={setShow} />
      <div className="grid gap-2">
        <div className="grid p-2">
          <Text color="eerie-black" size="sm" weight="medium">
            Mesa 21 - No. de Cliente: 2
          </Text>
          <Text color="silver" size="xs" className="capitalize">
            {dayjs(Date().toString()).format("DD [de] MMMM YYYY")}
          </Text>
          <Text color="silver" size="xs" className="capitalize">
            Ticket: 241
          </Text>
          <Text color="silver" size="xs" className="capitalize">
            Caja 1
          </Text>
        </div>
        <div className="grid gap-2 w-full">
          <TotalTable products={products} />
          <div className="flex justify-between items-center p-4 text-gray-800">
            <Text size="4xl" weight="semibold">
              Total
            </Text>
            <div className="flex gap-1 items-center">
              <Text size="2xl">$ {total}</Text>
              <Text size="lg">MXN</Text>
            </div>
          </div>
          <div className="grid justify-items-center items-center pb-4">
            <button
              onClick={() => setShow(true)}
              className="border rounded-xl py-2 px-6 bg-gray-400 text-white"
            >
              Cobrar
            </button>
          </div>
        </div>
      </div>
    </ContainerCard>
  );
};
