import { EditOptions } from "@/components/modules/inventory/table/editOptions";
import { GreenLabel } from "@/components/ui/Labels";
import { SalesColumnsProps } from "@/types/activities";
import { Sale } from "@/types/sales";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const SalesMobileColumns = ({
  handleDeleteSale,
  handleEditSale,
}: SalesColumnsProps): ColumnDef<Sale>[] => {
  return [
    {
      accessorKey: "mobileSale",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex w-full justify-between text-xl px-2 text-gray-600">
            <div className="flex flex-col text-left">
              <span>Recibo {row.original.ticketNumber}</span>
              <span className="">{row.original.date.toString()}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col text-right">
                <GreenLabel text={formatCurrency(row.original.total)} />

                <span className="text-secondary-gray">
                  {row.original.method}
                </span>
              </div>
              <div className="flex items-center">
                <EditOptions
                  handleDelete={handleDeleteSale}
                  handleEdit={handleEditSale}
                  id={row.original.id}
                />
              </div>
            </div>
          </div>
        );
      },
    },
  ];
};
