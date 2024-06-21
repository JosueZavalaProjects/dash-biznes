import cn from "classnames";
import Link from "next/link";

import { Product } from "@/types/inventory";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

import { EditOptions } from "./editOptions";

type InventoryColumnsProps = {
  handleDeleteProduct: (id: string) => void;
  handleEditProduct: (id: string) => void;
};

export const InventoryColumns = ({
  handleDeleteProduct,
  handleEditProduct,
}: InventoryColumnsProps): ColumnDef<Product>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => {
        const id: string = row.getValue("id");
        return (
          <Link href={`product/${id}`}>
            <div className="flex gap-2 items-center">
              <span className="w-14 h-14 bg-gray-400 rounded-full"></span>
              <p>{row.getValue("name")} </p>
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
    },
    {
      accessorKey: "subcategory",
      header: "Subcategoria",
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => {
        return <p>{formatCurrency(row.getValue("price"))} </p>;
      },
    },
    {
      accessorKey: "inventory",
      header: "Inventario",
    },
    {
      accessorKey: "dateAdded",
      header: "Fecha de Agregado",
    },
    {
      accessorKey: "availability",
      header: "Disponibilidad",
      cell: ({ row }) => {
        const amount: number = row.getValue("inventory");
        return (
          <p>
            <span
              className={cn("", {
                "text-green-primary": amount > 0,
                "text-red-primary": amount <= 0,
              })}
            >
              {amount > 0 && "En existencia"}
              {amount <= 0 && "Sin existencia"}
            </span>
          </p>
        );
      },
    },
    {
      accessorKey: "id",
      header: "...",
      cell: ({ row }) => {
        const id: string = row.getValue("id");
        return (
          <EditOptions
            handleDeleteProduct={handleDeleteProduct}
            handleEditProduct={handleEditProduct}
            id={id}
          />
        );
      },
    },
  ];
};

{
  /*  */
}
