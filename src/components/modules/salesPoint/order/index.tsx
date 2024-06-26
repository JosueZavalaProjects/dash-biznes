"use client";
import { useEffect, useState } from "react";

import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { Product as ProductType } from "@/types/salesPoint";

import useSalesPointState from "../states/sales-point-state";
import { ProductCard } from "./components/ProductCard";

export const Order = () => {
  const [products, setProducts] = useState<ProductType[]>(PRODUCTS_MOCK);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(PRODUCTS_MOCK);

  const { GetDataProducts } = useSalesPoint();
  const { setCategories, categories, categorySelectedIndex } =
    useSalesPointState();

  const handleGetProducts = async () => {
    const productsReponse = await GetDataProducts();
    if (!productsReponse) return;

    const uniqueCategories = productsReponse
      .map((product) => product.category)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

    setProducts(productsReponse);
    setFilteredProducts(productsReponse);
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    if (categorySelectedIndex === -1) {
      setFilteredProducts(products);
      return;
    }

    const newProducts = [...products].filter(
      (product) => product.category === categories[categorySelectedIndex]
    );
    setFilteredProducts(newProducts);
  }, [categorySelectedIndex]);

  return (
    <section className="grid grid-cols-2 w-3/5 max-h-[34rem] gap-y-8 gap-x-2 p-4 overflow-scroll lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={`product_card_${product.id}`} product={product} />
      ))}
    </section>
  );
};
