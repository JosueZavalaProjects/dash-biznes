"use client";
import { FaPen } from "react-icons/fa";

import { SquareButton } from "@/components/ui/buttons/SquareButton";
import { Product as ProductType } from "@/types/inventory";

import { ProductDetails } from "./components/ProductDetails";

export type ProductProps = {
  product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
  const { name } = product;

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
      <div className="flex w-full border-b my-6 text-2xl">
        <span className="flex text-center border-b-2 border-blue-300 pb-4 pr-2">
          Descripción general
        </span>
      </div>
      <ProductDetails product={product} />
    </main>
  );
};
