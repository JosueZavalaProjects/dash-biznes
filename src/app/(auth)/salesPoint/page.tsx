"use client";
import { useEffect, useState } from "react";

import { SalesPointDesktop } from "@/components/modules/salesPoint/Desktop";
import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { Product as ProductType } from "@/types/salesPoint";
import { useWindowWidth } from "@react-hook/window-size";

export default function SalesPointPage() {
  const [products, setProducts] = useState<ProductType[]>(PRODUCTS_MOCK);

  const { clearSale } = useSalesPointState();
  const { GetDataProducts } = useSalesPoint();

  const handleClearOrder = () => {
    clearSale();
    console.log("Cleared sale");
    handleGetProducts();
  };

  const handleGetProducts = async () => {
    const productsReponse = await GetDataProducts();
    if (!productsReponse) return;

    setProducts(productsReponse);
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
          products={products}
          handleClearOrder={handleClearOrder}
        />
      )}
      {onlyWidth <= MOBILE_WIDTH && <div>Mobile Sales Point</div>}
    </>
  );
}
