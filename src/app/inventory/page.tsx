"use client";
import React from "react";

import { InventoryTable } from "@/components/inventory";
import PageTitle from "@/components/PageTitle";

type Props = {};

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Inventario" />
      <InventoryTable />
    </div>
  );
}
