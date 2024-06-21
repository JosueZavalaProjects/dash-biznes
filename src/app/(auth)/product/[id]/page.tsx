"use client";
import { useEffect, useState } from "react";

import { Loading } from "@/components/modals/components/Loading";
import { Product } from "@/components/modules/product";
import { useProduct } from "@/hooks/useProduct";
import { Product as ProductType } from "@/types/inventory";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(true);
  const { GetProductByID } = useProduct();

  const handleGetProductData = () => {
    setIsLoading(true);
    GetProductByID(params.id)
      .then((data) => {
        if (!data) return;

        const { name, category, subcategory, price, inventory, date } = data;
        const newProduct: ProductType = {
          id: params.id,
          name,
          category,
          subcategory,
          price,
          inventory,
          dateAdded: date,
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
      {!isLoading && productData && <Product product={productData} />}
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
