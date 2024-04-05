"use client";
import { useState } from "react";

import { KeyValueTypes } from "@/components/ui/input";
import { MOCK_PRODUCT, PRODUCT_KEYS } from "@/constants/addProduct";
import { useAmount } from "@/hooks/useAmount";
import { useProduct } from "@/hooks/useProduct";
import { Product, Unit } from "@/types/addProduct";

import { Modals } from "./components/modals";
import { ProductInformation } from "./components/steps/productInformation";
import { SetUnits } from "./components/steps/setUnits";

export const AddProduct = (): React.ReactElement => {
  const [step, setStep] = useState<number>(1);
  const [unit, setUnit] = useState<Unit>("pzs");
  const [product, setProduct] = useState<Product>(MOCK_PRODUCT);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<number>(1);

  const { amount, handleSetAmount, removeDecimalPart } = useAmount(unit);
  const { CreateProduct } = useProduct();

  const handleSetProduct = (value: string | number, key: KeyValueTypes) => {
    if (key === PRODUCT_KEYS.PRICE) value = +value;

    const newProduct = { ...product, [key]: value };

    setProduct(newProduct);
  };

  const handleSetInventoryStep = (newStep: number) => setStep(newStep);

  const handleAddProduct = async () => {
    try {
      const newProduct = { ...product, amount: +amount };
      await CreateProduct(newProduct);
      setModalStep(2);
      setProduct(MOCK_PRODUCT);
    } catch (error) {
      console.log(error);
    }
  };

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
      {step === 1 && (
        <SetUnits
          amount={amount}
          unit={unit}
          setStep={setStep}
          handleSetAmount={handleSetAmount}
          removeDecimalPart={removeDecimalPart}
          setUnit={setUnit}
        />
      )}
      {step === 2 && (
        <ProductInformation
          setStep={setStep}
          setShowModal={setShowModal}
          handleSetProduct={handleSetProduct}
          product={product}
        />
      )}
    </>
  );
};
