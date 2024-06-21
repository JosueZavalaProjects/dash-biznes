"use client";
import { useEffect, useState } from "react";

import { Loading } from "@/components/modals/components/Loading";
import { Product } from "@/components/modules/product";
import { useProduct } from "@/hooks/useProduct";
import { InventoryProduct } from "@/types/addProduct";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<InventoryProduct>();
  const [isLoading, setIsLoading] = useState(true);
  const [initialInventory, setInitialInventory] = useState<number>(0);
  const { GetProductByID } = useProduct();

  const handleGetProductData = () => {
    setIsLoading(true);
    GetProductByID(params.id)
      .then((data) => {
        if (!data) return;

        const { name, category, subcategory, price, inventory, date } = data;
        setInitialInventory(inventory);
        const newProduct: InventoryProduct = {
          id: params.id,
          name,
          type: "",
          category,
          purchaseAmount: 0,
          price,
          purchasePrice: price,
          amount: inventory,
          unit: "pzs",
        };
        setProductData(newProduct);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetProductData();
  }, []);

  return (
    <>
      {!isLoading && productData && (
        <Product
          product={productData}
          setProductData={setProductData}
          initialInventory={initialInventory}
        />
      )}
      {!isLoading && !productData && (
        <div className="grid justify-items-center items-center w-full h-screen text-4xl">
          No Fetch Data
        </div>
      )}
      {isLoading && (
        <div className="grid justify-items-center items-center w-full h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}
