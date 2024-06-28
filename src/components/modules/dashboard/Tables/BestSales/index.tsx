import { DataTable } from "@/components/DataTable";

import { BestSalesColumns, BestSales as BestSalesType } from "./columns";

const { v4: uuidv4 } = require("uuid");

const MOCK_BEST_SALES: BestSalesType[] = [
  {
    id: uuidv4(),
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
  {
    id: uuidv4(),
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 0,
  },
  {
    id: uuidv4(),
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
];
export const BestSales = () => {
  return (
    <DataTable
      columns={BestSalesColumns()}
      data={MOCK_BEST_SALES}
      pagination={false}
    />
  );
};
