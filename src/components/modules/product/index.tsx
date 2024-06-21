"use client";
import { FaPen } from "react-icons/fa";

import { SquareButton } from "@/components/ui/buttons/SquareButton";
import { Product as ProductType } from "@/types/inventory";

import { ProductDetails } from "./components/ProductDetails";

export type ProductProps = {
  product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
  const { id, name, category, subcategory, price, inventory } = product;

  return (
    <main className="grid p-6">
      <section className="flex justify-between">
        <div className="text-3xl">{name}</div>
        <div className="flex">
          <SquareButton
            text="Editar"
            icon={{ alt: "edit", icon: FaPen }}
            handleClick={() => alert("Hello")}
          />
          <SquareButton text="Descargar" handleClick={() => {}} />
        </div>
      </section>
      <div className="py-6">Tabs </div>
      <ProductDetails product={product} />
      <div>Locaciones en existencia </div>
    </main>
  );
};
