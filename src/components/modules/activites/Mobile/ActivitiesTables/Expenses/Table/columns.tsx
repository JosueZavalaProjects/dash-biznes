import { RedLabel } from "@/components/ui/Labels";
import { EXPENSES_TYPES_LABELS } from "@/constants/addExpense";
import { Purchase } from "@/types/purchases";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

export const ExpensesMobileColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "mobileExpense",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex w-full justify-between text-xl px-2 text-gray-600">
          <div className="flex flex-col text-left">
            <span className="capitalize">{row.original.name}</span>
            <span className="">{row.original.date.toString()}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col text-right">
              <RedLabel text={`-${formatCurrency(row.original.amount)}`} />
              <span className="text-secondary-gray capitalize">
                {EXPENSES_TYPES_LABELS[row.original.type]}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
];
