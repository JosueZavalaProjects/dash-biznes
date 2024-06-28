import { DataTable } from "@/components/DataTable";

import {
  ProductAlertColumns,
  ProductAlert as ProductAlertType,
} from "./columns";

const MOCK_PRODUCT_ALERT: ProductAlertType[] = [
  { id: "1", name: "Pantalon de mezclilla", inventory: 3 },
  { id: "2", name: "Pantalon de mezclilla", inventory: 3 },
  { id: "3", name: "Pantalon de mezclilla", inventory: 3 },
];

export const ProductAlert = () => {
  return (
    <div>
      <DataTable
        columns={ProductAlertColumns()}
        data={MOCK_PRODUCT_ALERT}
        pagination={false}
      />
    </div>
  );
};
