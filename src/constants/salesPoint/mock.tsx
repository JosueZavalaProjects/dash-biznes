import { ProductCardsProps, ProductCheckout } from "@/types/salesPoint";

export const CATEGORIES_MOCK = [
  "Ropa",
  "Imanes",
  "Llaveros",
  "Tazas",
  "Ropa",
  "Imanes",
  "Llaveros",
  "Tazas",
];

export const PRODUCTS_MOCK: ProductCardsProps[] = [
  {
    id: "",
    name: "",
    price: 0,
    category: "",
    inventory: 0,
    subcategory: "",
    showAmount: false,
    items: 0,
  },
];

export const TOTAL_MOCK = [{}];

export const MOCK_INITIAL_PRODUCTS: ProductCheckout = {
  id: "",
  name: "",
  price: 0,
  category: "",
  subcategory: "",
  inventory: 0,
  amount: 0,
};
