"use client";
import React from "react";

import { SalesTable } from "@/components/modules/activites/sales";
import PageTitle from "@/components/PageTitle";

type Props = {};

export default function SalesPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Ventas" />
      <SalesTable />
    </div>
  );
}
