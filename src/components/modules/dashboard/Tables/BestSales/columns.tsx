import cn from "classnames";

import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export type BestSales = {
  id: string;
  name: string;
  price: number;
  totalSales: number;
  inventory: number;
};

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
      accessorKey: "inventory",
      header: "Estado",
      cell: ({ row }) => {
        const amount: number = row.getValue("inventory");
        return (
          <p>
            <span
              className={cn("p-1.5 rounded-2xl", {
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

    /*  {
      accessorKey: "id",
      header: "Editar / Eliminar",
      cell: ({ row }) => {
        const id: string = row.getValue("id");
        return (
          <p>
            <SimpleButton onClick={() => handleEditSale(id)}>
              <FaEdit />
            </SimpleButton>
            <SimpleButton onClick={() => handleDeleteSale(id)}>
              <FaRegTrashAlt />
            </SimpleButton>
          </p>
        );
      },
    }, */
  ];
};
