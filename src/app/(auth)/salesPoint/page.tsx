"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { Order } from "@/components/modules/salesPoint/order";
import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { TabCategories } from "@/components/modules/salesPoint/tabCategories";
import { Total } from "@/components/modules/salesPoint/total";
import Text from "@/components/ui/text";
import { PRODUCTS_MOCK } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { Product as ProductType } from "@/types/salesPoint";

require("dayjs/locale/es");

export default function SalesPointPage() {
  const [products, setProducts] = useState<ProductType[]>(PRODUCTS_MOCK);
  const { tabsContents, menuNav, tabName, setTabName, clearSale } =
    useSalesPointState();
  dayjs.locale("es");

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

  return (
    <div className="grid py-4 px-8 gap-8">
      <section className="grid gap-2">
        <div className="text-2xl">Negocio</div>
        <Text color="dark" size="lg" className="capitalize">
          {dayjs(Date().toString()).format("DD MMMM YYYY")}
        </Text>
      </section>
      <TabCategories />
      <section className="grid gap-4">
        <Text color="dark" size="2xl">
          Productos
        </Text>

        <section className="flex w-full gap-4">
          <Order products={products} />
          <Total handleClearOrder={handleClearOrder} />
        </section>
      </section>
    </div>
  );
}
