/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";

type Props = {};

interface Setting {
  category: string;
  value: string | number | boolean;
}

const columns: ColumnDef<Setting>[] = [
  {
    accessorKey: "category",
    header: "Categoria"
  },
  {
    accessorKey: "value",
    header: "Valor"
  }
];
const data: Setting[] = [
  {
    category: "Cuenta",
    value: true
  },
  {
    category: "Notificaciones",
    value: false
  },
  {
    category: "Idioma",
    value: "Español"
  },
  {
    category: "Tema",
    value: "Dark"
  }
];

export default function SettingsPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Ajustes" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
