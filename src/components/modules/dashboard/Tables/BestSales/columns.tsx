import cn from "classnames";

import { BestSales } from "@/types/dashboard";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const BestSalesColumns = (): ColumnDef<BestSales>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nombre del producto",
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => {
        return <p>{formatCurrency(row.getValue("price"))} </p>;
      },
    },
    {
      accessorKey: "totalSales",
      header: "Ventas Totales",
    },
    {
      accessorKey: "inventory",
      header: "Existencia",
    },
    {
      accessorKey: "inventory_state",
      header: "Estado",
      cell: ({ row }) => {
        const amount: number = row.getValue("inventory");
        return (
          <p className="w-28">
            <span
              className={cn("px-2 py-1.5 rounded-2xl w-24", {
                "text-green-primary bg-[#92FE9D]/[0.20]": amount > 0,
                "text-red-primary bg-[#F97171]/[0.20]": amount <= 0,
              })}
            >
              {amount > 0 && "En Existencia"}
              {amount <= 0 && "Sin Existencia"}
            </span>
          </p>
        );
      },
    },
  ];
};
