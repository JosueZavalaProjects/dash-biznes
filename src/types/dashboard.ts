import { InventoryProduct } from "./addProduct";

export type GraphResult = { date: string; total: number };

export type GroupTotals = { [x: string]: number[] };

export type GraphData = { name: string; total: number };

export type BestSales = {
  id: string;
  name: string;
  price: number;
  totalSales: number;
  inventory: number;
};

export type ProductMovements = {
  details: InventoryProduct;
  purchases: number;
  id: string;
};

export type PurchasesMovements = {
  [id: string]: ProductMovements;
};
