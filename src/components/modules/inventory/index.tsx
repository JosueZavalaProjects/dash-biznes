import { useEffect, useState } from "react";

import { data as productData } from "@/constants/inventory";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/inventory";

import { DataTable } from "../../DataTable";
import { InventoryColumns } from "./table/columns";

export const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>(productData);
  const { GetDataProducts } = useProduct();

  const handleGetProducts = async () => {
    const newProducts = await GetDataProducts();

    setInventoryData(newProducts);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return <DataTable columns={InventoryColumns} data={inventoryData} />;
};
