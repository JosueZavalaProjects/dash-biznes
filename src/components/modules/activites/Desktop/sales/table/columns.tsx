import { EditOptions } from "@/components/modules/inventory/table/editOptions";
import { SalesColumnsProps } from "@/types/activities";
import { Sale } from "@/types/sales";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const SalesColumns = ({
  handleDeleteSale,
  handleEditSale,
}: SalesColumnsProps): ColumnDef<Sale>[] => {
  return [
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
    {
      accessorKey: "id",
      header: "...",
      cell: ({ row }) => {
        const id: string = row.getValue("id");
        return (
          <EditOptions
            handleDelete={handleDeleteSale}
            handleEdit={handleEditSale}
            id={id}
          />
        );
      },
    },
  ];
};
