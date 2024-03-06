import { Product, ProductKeys } from "@/types/add-product";

export const MOCK_PRODUCT: Product = {
  category: "",
  type: "",
  name: "",
  price: 0,
  amount: 0,
  unit: "pzs",
};

export const PRODUCT_KEYS: { [key: string]: ProductKeys } = {
  CATEGORY: "category",
  TYPE: "type",
  NAME: "name",
  PRICE: "price",
  AMOUNT: "amount",
  UNIT: "unit",
};
