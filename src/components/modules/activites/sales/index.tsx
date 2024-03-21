import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { data as SalesData } from "@/constants/activities/sales";
import { useSales } from "@/hooks/useSales";
import { Sale } from "@/types/sales";

import { DataTable } from "../../../DataTable";
import { columns } from "./table/columns";

require("dayjs/locale/es");

export const SalesTable = () => {
  const [sales, setSales] = useState<Sale[]>(SalesData);
  const { GetDataSales } = useSales();
  dayjs.locale("es");

  const handleGetSales = async () => {
    const newProducts = await GetDataSales();

    setSales(newProducts);
  };

  useEffect(() => {
    handleGetSales();
  }, []);

  return <DataTable columns={columns} data={sales} />;
};
