import { DataTable } from "@/components/DataTable";
import { Purchase } from "@/types/purchases";

import { ExpensesMobileColumns } from "./columns";

export const ExpensesMobileTable = ({ expenses }: { expenses: Purchase[] }) => (
  <DataTable columns={ExpensesMobileColumns} data={expenses} />
);
