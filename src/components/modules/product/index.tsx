"use client";
import { useState } from "react";
import { FaPen } from "react-icons/fa";

import { SquareButton } from "@/components/ui/buttons/SquareButton";
import { KeyValueTypes } from "@/components/ui/input";
import { PRODUCT_KEYS } from "@/constants/addProduct";
import { useProduct } from "@/hooks/useProduct";
import { InventoryProduct } from "@/types/addProduct";
import { InventoryModalStep } from "@/types/inventory";

import { InventoryModal } from "../inventory/modal";
import { ProductDetails } from "./components/ProductDetails";

export type ProductProps = {
  product: InventoryProduct;
  initialInventory: number;
  setProductData: (product: InventoryProduct) => void;
};

export const Product = ({
  product,
  setProductData,
  initialInventory,
}: ProductProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<InventoryModalStep>(
    InventoryModalStep.edit
  );
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);

  const { DeleteProduct, UpdateProduct } = useProduct();

  const handleUpdateProduct = () => {
    const response = UpdateProduct(product.id!, product, initialInventory);
    setIsLoadingModal(true);

    response
      .then((res) => {
        setModalStep(InventoryModalStep.editConfirm);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingModal(false);
      });
  };

  const handleDeleteProduct = async () => {
    setIsLoadingModal(true);
    try {
      const response = await DeleteProduct(product.id!);

      setModalStep(InventoryModalStep.deleteConfirm);
    } catch {
      throw new Error("Something went wrong");
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleSetValueProduct = (
    value: string | number,
    key?: KeyValueTypes
  ) => {
    const keyValue = key || "name";
    if (key === PRODUCT_KEYS.PRICE) value = +value;

    const newProduct = { ...product, [keyValue]: value };

    setProductData(newProduct);
  };

  const handleShowDeleteModal = () => {
    setModalStep(InventoryModalStep.delete);
    setShowModal(true);
  };

  const { name } = product;

  return (
    <main className="grid p-6">
      <InventoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalStep={modalStep}
        product={product}
        handleSetProduct={handleSetValueProduct}
        isLoading={isLoadingModal}
        updateProduct={handleUpdateProduct}
        deleteProduct={handleDeleteProduct}
        setModalStep={setModalStep}
      />
      <section className="flex justify-between">
        <div className="text-3xl">{name}</div>
        <div className="flex">
          <SquareButton
            text="Editar"
            icon={{ alt: "edit", icon: FaPen }}
            handleClick={() => setShowModal(true)}
          />
          <SquareButton text="Descargar" handleClick={() => {}} />
        </div>
      </section>
      <div className="flex w-full border-b my-6 text-2xl">
        <span className="flex text-center border-b-2 border-blue-300 pb-4 pr-2">
          Descripción general
        </span>
      </div>
      <ProductDetails
        product={product}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </main>
  );
};
