"use client";
import React from "react";

import { InventoryTable } from "@/components/modules/inventory";
import PageTitle from "@/components/PageTitle";
import { BlueAddButton } from "@/components/ui/buttons/blueButton";

type Props = {};

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex justify-between pr-8">
        <PageTitle title="Inventario" />
        <BlueAddButton link="/addProduct" />
      </div>
      <InventoryTable />
    </div>
  );
}
