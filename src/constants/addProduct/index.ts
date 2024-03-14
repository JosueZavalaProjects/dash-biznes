import { Product, ProductKeys } from "@/types/addProduct";

export const MOCK_PRODUCT: Product = {
  category: "",
  type: "",
  name: "",
  price: 0,
  purchasePrice: 0,
  amount: 0,
  unit: "pzs",
};

export const PRODUCT_KEYS: { [key: string]: ProductKeys } = {
  CATEGORY: "category",
  TYPE: "type",
  NAME: "name",
  PRICE: "price",
  PURCHASE_PRICE: "purchasePrice",
  AMOUNT: "amount",
  UNIT: "unit",
};
