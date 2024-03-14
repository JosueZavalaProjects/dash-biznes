import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Icon = {
  src: string | StaticImport;
  width?: number | `${number}`;
  height?: number | `${number}`;
  alt: string;
  link?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  inventory?: number;
};

export type ProductCheckout = Product & {
  amount: number;
};

export type ProductsMock = {
  [key: string]: Product[];
};
