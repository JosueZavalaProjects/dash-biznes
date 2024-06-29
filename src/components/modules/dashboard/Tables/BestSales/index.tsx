import { useEffect, useState } from "react";

import { DataTable } from "@/components/DataTable";
import { TOP_SALES } from "@/constants/dashboard";
import { useProductMovements } from "@/hooks/useProductMovements";
import {
  BestSales as BestSalesType,
  PurchasesMovements,
} from "@/types/dashboard";

import { BestSalesColumns } from "./columns";

export const BestSales = () => {
  const { GetPurchaseSales } = useProductMovements();
  const [allPurchases, setAllPurchases] = useState<PurchasesMovements>({});
  const [bestSales, setBestSales] = useState<BestSalesType[]>([]);

  const handleGetPurchases = async () => {
    const newPurchases = await GetPurchaseSales();

    setAllPurchases(newPurchases);
  };

  const getBestSales = () => {
    const orderedArray = Object.values(allPurchases).sort((a, b) => {
      return b.purchases - a.purchases;
    });

    const newBestSales: BestSalesType[] = orderedArray
      .slice(0, TOP_SALES)
      .map((element) => {
        const {
          id,
          purchases,
          details: { name, price, inventory },
        } = element;

        return {
          id,
          name,
          price,
          totalSales: purchases,
          inventory: inventory || 0,
        };
      });

    setBestSales(newBestSales);
  };

  useEffect(() => {
    getBestSales();
  }, [Object.keys(allPurchases).length]);

  useEffect(() => {
    handleGetPurchases();
  }, []);

  return (
    <DataTable
      columns={BestSalesColumns()}
      data={bestSales}
      pagination={false}
    />
  );
};
