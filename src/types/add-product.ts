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
  amount: number;
  unit: Unit;
};

export type ProductKeys =
  | "category"
  | "type"
  | "name"
  | "price"
  | "amount"
  | "unit";
