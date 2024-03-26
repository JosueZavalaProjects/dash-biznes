import { useState } from "react";

import { MOCK_PRODUCT, PRODUCT_KEYS } from "@/constants/addProduct";
import { Product, ProductKeys } from "@/types/addProduct";

import { ProductInformation } from "../../addProduct/components/steps/productInformation";
import { ProductForm } from "../../addProduct/components/steps/productInformation/productForm";

type EditProductProps = {
  product: Product;
  handleSetValueProduct: (value: string | number, key?: ProductKeys) => void;
};

export const EditProduct = ({
  product,
  handleSetValueProduct,
}: EditProductProps) => {
  /* const handleSetValueProduct = (value: string | number, key?: ProductKeys) => {
    const keyValue = key || "name";
    if (key === PRODUCT_KEYS.PRICE) value = +value;
    if (typeof value === "string") value = value.toLowerCase();

    const newProduct = { ...product, [keyValue]: value };

    setProduct(newProduct);
  }; */
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
