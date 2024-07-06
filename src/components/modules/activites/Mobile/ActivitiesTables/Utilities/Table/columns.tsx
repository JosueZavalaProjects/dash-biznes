import dayjs from "dayjs";

import { BlueLabel, GreenLabel, RedLabel } from "@/components/ui/Labels";
import { ACTIVITIES_LABEL, Activity, ActivityType } from "@/types/activities";
import { formatCurrency } from "@/utils/common";
import { ColumnDef } from "@tanstack/react-table";

require("dayjs/locale/es");
export const UtilitiesMobileColumns: ColumnDef<ActivityType>[] = [
  {
    accessorKey: "mobileExpense",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex w-full justify-between text-xl px-4 text-gray-600">
          <div className="flex flex-col text-left">
            <span className="capitalize">
              {ACTIVITIES_LABEL[row.original.type]}
            </span>
            <span className="">
              {dayjs(row.original.date).format("DD/MM/YY HH:mm")}
            </span>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col text-right">
              {row.original.type === Activity.expense && (
                <RedLabel text={`${formatCurrency(row.original.amount)}`} />
              )}
              {row.original.type === Activity.sale && (
                <GreenLabel text={`+${formatCurrency(row.original.amount)}`} />
              )}
              {row.original.type === Activity.utility && (
                <BlueLabel text={formatCurrency(row.original.amount)} />
              )}
            </div>
          </div>
        </div>
      );
    },
  },
];
