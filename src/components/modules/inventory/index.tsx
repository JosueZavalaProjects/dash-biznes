import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { data as productData } from "@/constants/inventory";
import { db } from "@/services/firebase";
import { Product } from "@/types/inventory";

import { DataTable } from "../../DataTable";
import { InventoryColumns } from "./table/columns";

export const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>(productData);
  const productsRef = collection(db, "products");
  const handleGetProducts = async () => {
    const newProducts = await getDataProducts();

    setInventoryData(newProducts);
  };

  const getDataProducts = async () => {
    const q = query(productsRef, orderBy("date", "desc"));
    const qwerySnapshot = await getDocs(q);

    const response: Product[] = [];

    qwerySnapshot.forEach((doc) => {
      const { name, category, subcategory, price, inventory, date } =
        doc.data();

      response.push({
        name,
        category,
        subcategory,
        price,
        inventory,
        dateAdded:
          dayjs(date).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
      });
    });
    return response;
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return <DataTable columns={InventoryColumns} data={inventoryData} />;
};
