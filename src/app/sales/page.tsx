"use client";
import React from "react";

import PageTitle from "@/components/PageTitle";
import { SalesTable } from "@/components/modules/sales";

type Props = {};

export default function SalesPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Ventas" />
      <SalesTable />
      {/* <DataTable columns={columns} data={SalesData} /> */}
    </div>
  );
}
