import { useState } from "react";

import { MOCK_PRODUCT } from "@/constants/addProduct";
import { Product, ProductKeys } from "@/types/addProduct";

import { ProductInformation } from "../../addProduct/components/steps/productInformation";
import { ProductForm } from "../../addProduct/components/steps/productInformation/productForm";

type EditProductProps = { product: Product };

export const EditProduct = ({ product }: EditProductProps) => {
  const handleSetValueProduct = (value: string, key?: ProductKeys) => {};
  const handleAddButton = () => {};
  const isValidForm = true;

  return (
    <div className="flex sm:w-[440px] justify-center bg-white rounded-lg  mx-auto">
      <ProductForm
        product={product}
        handleSetValueProduct={handleSetValueProduct}
        handleAddButton={() => {}}
        isValidForm={isValidForm}
      />
    </div>
  );
};
