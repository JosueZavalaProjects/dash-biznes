"use client";
import { useEffect, useState } from "react";

import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { Product as ProductType } from "@/types/salesPoint";

import { ProductCard } from "./components/ProductCard";

export const Order = () => {
  const [categories, setCategorires] = useState<string[]>([""]);
  const [products, setProducts] = useState<ProductType[]>(PRODUCTS_MOCK);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(PRODUCTS_MOCK);

  const { GetDataProducts } = useSalesPoint();

  const handleGetProducts = async () => {
    const productsReponse = await GetDataProducts();
    if (!productsReponse) return;

    console.log(productsReponse);
    const uniqueCategories = productsReponse
      .map((product) => product.category)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

    setProducts(productsReponse);
    setFilteredProducts(productsReponse);
    setCategorires(uniqueCategories);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <section className="grid grid-cols-3 w-3/5 max-h-[34rem] gap-y-8 gap-x-2 p-4 overflow-scroll">
      {products.map((product) => (
        <ProductCard key={`product_card_${product.id}`} product={product} />
      ))}
    </section>
  );
};
