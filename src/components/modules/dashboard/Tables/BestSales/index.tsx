import { DataTable } from "@/components/DataTable";
import { BestSalesColumns, BestSales as BestSalesType } from "./columns";

const MOCK_BEST_SALES: BestSalesType[] = [
  {
    id: "1",
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
  {
    id: "1",
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 0,
  },
  {
    id: "1",
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
  {
    id: "1",
    name: "Pantalon de mezclilla",
    price: 20,
    totalSales: 30,
    inventory: 2,
  },
];
export const BestSales = () => {
  return (
    <div>
      <DataTable
        columns={BestSalesColumns()}
        data={MOCK_BEST_SALES}
        pagination={false}
      />
    </div>
  );
};
