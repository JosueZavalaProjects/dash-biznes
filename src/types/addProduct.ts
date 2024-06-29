import { Timestamp } from "firebase/firestore";

export type Unit = "pzs" | "kg" | "lt";

export type DropdownOption = { value: Unit; label: string };

export const UnitsObject: { [key: string]: Unit } = {
  pzs: "pzs",
  kg: "kg",
  lt: "lt",
};

export type Product = {
  category: string;
  type: string;
  name: string;
  price: number;
  purchasePrice: number;
  purchaseAmount: number;
  amount: number;
  unit: Unit;
};

export type ProductKeys =
  | "category"
  | "type"
  | "name"
  | "price"
  | "purchasePrice"
  | "amount"
  | "unit";

export type MovementType =
  | "add"
  | "reduce"
  | "purchase"
  | "new"
  | "editPurchase"
  | "delete";

export type ProductMovement = {
  id: string;
  amount: number;
  type: MovementType;
  date: Timestamp;
  saleId?: string;
  price?: number;
  purchasePrice?: number;
};

export type ProductMovementAdminID = ProductMovement & {
  adminEmail: string;
};

export type InventoryProduct = Product & { id: string; inventory?: number };
