import Image from "next/image";

import { Product } from "@/types/inventory";
import { formatCurrency } from "@/utils/common";
import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { ColumnDef } from "@tanstack/react-table";

export const InventoryColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const avatar = createAvatar(lorelei, {
        seed: row.getValue("name"),
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      });

      const svg = avatar.toDataUriSync();
      return (
        <div className="flex gap-2 items-center">
          <Image
            width={60}
            height={60}
            className="h-15 w-15 bg-main-gray rounded-full"
            src={svg}
            alt="user-image"
          />
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
