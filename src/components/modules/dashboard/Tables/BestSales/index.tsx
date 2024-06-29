import { useEffect, useState } from "react";

import { DataTable } from "@/components/DataTable";
import { useProductMovements } from "@/hooks/useProductMovements";
import {
  BestSales as BestSalesType,
  PurchasesMovements,
} from "@/types/dashboard";

import { BestSalesColumns } from "./columns";

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
const TOP_SALES = 5;
export const BestSales = () => {
  const { GetPurchaseSales } = useProductMovements();
  const [allPurchases, setAllPurchases] = useState<PurchasesMovements>({});
  const [bestSales, setBestSales] = useState<BestSalesType[]>([]);

  const handleGetPurchases = async () => {
    const newPurchases = await GetPurchaseSales();

    setAllPurchases(newPurchases);
  };

  const getBestSales = () => {
    /* const newAllPurchases = { ...allPurchases }; */

    const orderedArray = Object.values(allPurchases).sort((a, b) => {
      return b.purchases - a.purchases;
    });
    console.log(orderedArray);

    const newBestSales: BestSalesType[] = orderedArray
      .slice(0, TOP_SALES - 1)
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
    /* for (const [key, value] of Object.entries(newAllPurchases)) {
      const { purchases, details } = value;
      const _sumPurchases = sumPurchases(purchases);
      newAllPurchases[key].purchases = _sumPurchases;
      allPurchasesArray.push(_sumPurchases);

      console.log(`${key}: ${purchases}, ${details}`);
    }
    const sortedArray = allPurchasesArray.sort((a, b) => {
      return a - b;
    }); */
    // setAllPurchases(newAllPurchases)
  };

  /* const sumPurchases = (purchases: number[] | number) => {
    if (typeof purchases === "number") return purchases;

    return purchases.reduce((a, b) => a + b);
  }; */

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
