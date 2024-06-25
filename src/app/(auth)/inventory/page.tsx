"use client";
import React from "react";

import { InventoryTable } from "@/components/modules/inventory";
import PageTitle from "@/components/PageTitle";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";

type Props = {};

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex justify-between pr-8">
        <PageTitle title="Inventario" />
        <SimpleButton bgColor="gradient-blue">
          <div className="flex gap-2 items-center">
            <span className="grid justify-items-center items-center w-8 h-8 bg-slate-600 rounded-full border-dashed border-2 border-sky-500">
              +
            </span>
            Agregar
          </div>
        </SimpleButton>
      </div>
      <InventoryTable />
    </div>
  );
}
