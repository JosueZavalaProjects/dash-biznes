import { useEffect, useState } from "react";

import { DataTable } from "@/components/DataTable";
import { ALERT_AMOUNT } from "@/constants/dashboard";
import { useProduct } from "@/hooks/useProduct";
import { ProductAlert as ProductAlertType } from "@/types/dashboard";

import { ProductAlertColumns } from "./columns";

export const ProductAlert = () => {
  const [productAlerts, setProductAlerts] = useState<ProductAlertType[]>([]);
  const { GetDataProducts } = useProduct();

  const handleSetProductAlerts = async () => {
    const allProducts = await GetDataProducts();
    const newAlertProducts: ProductAlertType[] = allProducts
      .filter((element) => element.inventory < ALERT_AMOUNT)
      .sort((a, b) => a.inventory - b.inventory)
      .map((element) => {
        const { id, name, inventory } = element;
        return {
          id: id || "",
          name,
          inventory,
        };
      });

    setProductAlerts(newAlertProducts);
  };

  useEffect(() => {
    handleSetProductAlerts();
  }, []);

  return (
    <div className="h-80 overflow-y-scroll">
      <DataTable
        columns={ProductAlertColumns()}
        data={productAlerts}
        pagination={false}
      />
    </div>
  );
};
