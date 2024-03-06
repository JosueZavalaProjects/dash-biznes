import { Product } from "@/types/inventory";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const InventoryColumns: ColumnDef<Product>[] = [
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
];
