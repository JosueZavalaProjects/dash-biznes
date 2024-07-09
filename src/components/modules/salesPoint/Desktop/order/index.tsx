"use client";
import { useEffect, useState } from "react";

import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { ProductCheckout } from "@/types/salesPoint";
import { Product as ProductType } from "@/types/salesPoint";

import useSalesPointState from "../../states/sales-point-state";
import { ProductCard } from "./components/ProductCard";

type OrderProps = {
  products: ProductType[];
};

export const Order = ({ products }: OrderProps) => {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(PRODUCTS_MOCK);

  const { setCategories, categories, categorySelectedIndex } =
    useSalesPointState();

  const hanldeUpdateProducts = () => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

    setFilteredProducts(products);
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    hanldeUpdateProducts();
  }, [products]);

  useEffect(() => {
    if (categorySelectedIndex === -1) {
      setFilteredProducts(products);
      return;
    }

    const newProducts = [...filteredProducts].filter(
      (product) => product.category === categories![categorySelectedIndex]
    );
    setFilteredProducts(newProducts);
  }, [categorySelectedIndex]);

  return (
    <section className="grid grid-cols-1 w-1/2 max-h-[44rem] gap-y-8 gap-x-2 p-4 overflow-scroll lg:w-3/5 lg:grid-cols-2 xl:grid-cols-3 2xl:max-h-[54rem]">
      {Boolean(filteredProducts.length) &&
        filteredProducts.map((product, index) => (
          <ProductCard
            key={`product_card_${product.id}`}
            product={product}
            index={index}
          />
        ))}
    </section>
  );
};
