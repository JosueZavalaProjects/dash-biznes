import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import cn from "classnames";

import { SimpleButton } from "@/components/ui/simpleButton";
import { Product } from "@/types/inventory";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

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
        return (
          <div className="flex gap-2 items-center">
            <span className="w-14 h-14 bg-gray-400 rounded-full"></span>
            <p>{row.getValue("name")} </p>
          </div>
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
      accessorKey: "inventory",
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
      header: "Editar / Eliminar",
      cell: ({ row }) => {
        const id: string = row.getValue("id");
        return (
          <p>
            <SimpleButton onClick={() => handleEditProduct(id)}>
              <FaEdit />
            </SimpleButton>
            <SimpleButton onClick={() => handleDeleteProduct(id)}>
              <FaRegTrashAlt />
            </SimpleButton>
          </p>
        );
      },
    },
  ];
};
