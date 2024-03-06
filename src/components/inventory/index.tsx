import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { collection, getDocs } from "firebase/firestore";

import { data as productData } from "@/constants/inventory";
import { db } from "@/services/firebase";
import { Product } from "@/types/inventory";

import { DataTable } from "../DataTable";
import { InventoryColumns } from "./table/columns";

export const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>(productData);
  const handleGetProducts = async () => {
    const newProducts = await getDataProducts();

    setInventoryData(newProducts);
  };

  const getDataProducts = async () => {
    const qwerySnapshot = await getDocs(collection(db, "products"));

    const response: Product[] = [];

    qwerySnapshot.forEach((doc) => {
      const { name, category, subcategory, price, inventory } = doc.data();

      //TODO: Replace price * 0.8 by purchaseCost
      response.push({
        name,
        category,
        subcategory,
        price,
        inventory,
        dateAdded: dayjs(Date().toString()).format("DD [de] MMMM YYYY"),
      });
    });
    return response;
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return <DataTable columns={InventoryColumns} data={inventoryData} />;
};
