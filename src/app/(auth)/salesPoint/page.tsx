"use client";
import { useEffect, useState } from "react";

import { SalesPointDesktop } from "@/components/modules/salesPoint/Desktop";
import { SalesPointMobile } from "@/components/modules/salesPoint/Mobile";
import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { ProductCheckout } from "@/types/salesPoint";
import { useWindowWidth } from "@react-hook/window-size";

export default function SalesPointPage() {
  const [products, setProducts] = useState<ProductCheckout[]>(PRODUCTS_MOCK);

  const { clearSale, products: cartProducts } = useSalesPointState();
  const { GetDataProducts } = useSalesPoint();

  const handleClearOrder = () => {
    clearSale();
    console.log("Cleared sale");
    handleGetProducts();
  };

  const handleGetProducts = async () => {
    const productsReponse = await GetDataProducts();
    if (!productsReponse) return;

    const newProducts = productsReponse.map((product) => {
      return {
        ...product,
        amount: 0,
      };
    });

    setProducts(newProducts);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const MOBILE_WIDTH = 768;
  const onlyWidth = useWindowWidth();

  return (
    <>
      {onlyWidth > MOBILE_WIDTH && (
        <SalesPointDesktop
          cartProducts={cartProducts}
          products={products}
          handleClearOrder={handleClearOrder}
        />
      )}
      {onlyWidth <= MOBILE_WIDTH && <SalesPointMobile />}
    </>
  );
}
