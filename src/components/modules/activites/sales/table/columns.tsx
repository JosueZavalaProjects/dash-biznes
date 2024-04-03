import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import { SimpleButton } from "@/components/ui/simpleButton";
import { Sale } from "@/types/sales";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

type SalesColumnsProps = {
  handleEditSale: (id: string) => void;
  handleDeleteSale: (id: string) => void;
};

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
    },
  ];
};
