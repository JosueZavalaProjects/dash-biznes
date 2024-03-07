import { Purchase } from "@/types/purchases";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Número de Ticket",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      return <p>{formatCurrency(row.getValue("total"))} </p>;
    },
  },
  {
    accessorKey: "method",
    header: "Metodo",
  },
];
