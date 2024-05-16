"use client";
import { useEffect, useState } from "react";

import { KeyValueTypes } from "@/components/ui/input";
import { MOCK_PRODUCT, PRODUCT_KEYS } from "@/constants/addProduct";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/addProduct";

import { Modals } from "./components/modals";
import { ProductInformation } from "./components/steps/productInformation";

export const AddProduct = (): React.ReactElement => {
  const [step, setStep] = useState<number>(1);
  const [product, setProduct] = useState<Product>(MOCK_PRODUCT);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<number>(1);

  const { CreateProduct } = useProduct();

  const handleSetProduct = (value: string | number, key: KeyValueTypes) => {
    if (key === PRODUCT_KEYS.AMOUNT) {
      handleAddAmount(`${value}`);
      return;
    }

    if (key === PRODUCT_KEYS.PRICE || key === PRODUCT_KEYS.PURCHASE_PRICE)
      value = +value;

    const newProduct = { ...product, [key]: value };

    setProduct(newProduct);
  };

  const handleAddAmount = (amount: string | number) => {
    const { unit } = product;
    let newAmount: number | string = amount;
    const invalidChar = ["e", "E", "+", "-"];
    if (invalidChar.includes(`${amount}`)) return;

    if (unit === "pzs") newAmount = parseInt(`${amount}`);
    if (unit !== "pzs") newAmount = parseFloat(`${amount}`).toFixed(2);

    const newProduct = { ...product, [PRODUCT_KEYS.AMOUNT]: +newAmount };

    setProduct(newProduct);
  };

  const handleSetInventoryStep = (newStep: number) => setStep(newStep);

  const handleAddProduct = async () => {
    try {
      const newProduct = { ...product };
      await CreateProduct(newProduct);
      setProduct(MOCK_PRODUCT);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { amount } = product;
    handleAddAmount(amount);
  }, [product.unit]);

  return (
    <>
      <Modals
        show={showModal}
        modalStep={modalStep}
        setShow={setShowModal}
        setInventoryStep={handleSetInventoryStep}
        handleAddProduct={handleAddProduct}
        setModalStep={setModalStep}
      />
      <ProductInformation
        setShowModal={setShowModal}
        handleSetProduct={handleSetProduct}
        product={product}
      />
    </>
  );
};
