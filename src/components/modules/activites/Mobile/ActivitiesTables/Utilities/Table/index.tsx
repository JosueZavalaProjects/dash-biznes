import { DataTable } from "@/components/DataTable";
import { ActivityType } from "@/types/activities";

import { UtilitiesMobileColumns } from "./columns";

export const UtilitiesMobileTable = ({
  activities,
}: {
  activities: ActivityType[];
}) => <DataTable columns={UtilitiesMobileColumns} data={activities} />;
