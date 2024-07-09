import { Activites } from "@/types/activities";

import { ExpensesActivity } from "./Expenses";
import { InventoryActivity } from "./Inventory";
import { SalesActivity } from "./Sales";
import { UtilitiesActivity } from "./Utilities";

type ActivitesTablesProps = {
  acitivitySelected: Activites;
};
export const ActivitesTables = ({
  acitivitySelected = Activites.sales,
}: ActivitesTablesProps) => {
  return (
    <>
      {acitivitySelected === Activites.sales && <SalesActivity />}
      {acitivitySelected === Activites.utilites && <UtilitiesActivity />}
      {acitivitySelected === Activites.inventory && <InventoryActivity />}
      {acitivitySelected === Activites.expenses && <ExpensesActivity />}
    </>
  );
};
