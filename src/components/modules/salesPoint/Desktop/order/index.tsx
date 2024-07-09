"use client";
import { useEffect, useState } from "react";

import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { ProductCardsProps, ProductCheckout } from "@/types/salesPoint";

import useSalesPointState from "../../states/sales-point-state";
import { ProductCard } from "./components/ProductCard";

type OrderProps = {
  products: ProductCheckout[];
  cartProducts: ProductCheckout[];
};

export const Order = ({ products, cartProducts }: OrderProps) => {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductCheckout[]>(PRODUCTS_MOCK);
  /* const [productCardsProps, setProductCardsProps] = useState<
    ProductCardsProps[]
  >([]); */

  const { setCategories, categories, categorySelectedIndex } =
    useSalesPointState();

  /*  const handleUpdateShowAmount = (id: string, newValue: boolean) => {
    const newProducts = [...filteredProducts];

    const newProductProps = newProducts.map((product) => {
      if (product.id === id) product.showAmount = newValue;
      return product;
    });

    setFilteredProducts(newProductProps);
  }; */

  /* const handleUpdateItems = (id: string, newValue: number) => {
    const newProducts = [...filteredProducts];

    const newProductProps = newProducts.map((product) => {
      if (product.id === id) product.amount = newValue;
      return product;
    });
    // newProductProps!.items = newValue;

    setFilteredProducts(newProductProps);
  }; */

  const hanldeUpdateProducts = () => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

    setFilteredProducts(products);
    /* setProductCardsProps([]); */
    setCategories(uniqueCategories);
  };

  /*   const handleSetInitialProducts = (): ProductCardsProps[] => {
    return products.map((product) => {
      return {
        ...product,
        showAmount: false,
      };
    });
  }; */

  /* useEffect(() => {
    if (!filteredProducts) return;

    const newCardsProps: ProductCardsProps[] = [];
    filteredProducts.forEach((product) => {
      newCardsProps.push({
        id: product.id,
        showAmount: false,
        items: 0,
      });
    });

    setProductCardsProps(newCardsProps);
    console.log({ newCardsProps });
    console.log({ filteredProducts });
  }, [filteredProducts]); */

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
      {
        /* productCardsProps.length !==  */
        filteredProducts.length &&
          filteredProducts.map((product, index) => (
            <ProductCard
              key={`product_card_${product.id}`}
              product={product}
              /* cartProduct={cartProducts[index]} */
              index={index}
              /*      productCardsProps={
              productCardsProps.find(
                (productProp) => productProp.id === product.id
              ) || { id: product.id, showAmount: false, items: 0 }
            } */
              /* handleSetShowAmount={handleUpdateShowAmount}
              handleSetItems={handleUpdateItems} */
            />
          ))
      }
    </section>
  );
};
