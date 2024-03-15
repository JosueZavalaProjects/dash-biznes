import { EXPENSES_TYPES_LABELS } from "@/constants/addExpense";
import { Purchase } from "@/types/purchases";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "name",
    header: "Nombre de Gasto",
  },
  {
    accessorKey: "type",
    header: "Tipo de gasto",
    cell: ({ row }) => {
      const type: string = row.getValue("type") || "others";
      return <p>{EXPENSES_TYPES_LABELS[type]} </p>;
    },
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
    cell: ({ row }) => {
      return <p>{formatCurrency(row.getValue("amount"))} </p>;
    },
  },
];
