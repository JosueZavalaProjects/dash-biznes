import { DocumentData } from "firebase/firestore";
import { useState } from "react";

import { KeyValueTypes } from "@/components/ui/input";
import { MOCK_PRODUCT, PRODUCT_KEYS } from "@/constants/addProduct";
import { data as productData } from "@/constants/inventory";
import { Product as ToAddProduct } from "@/types/addProduct";
import { InventoryModalStep, Product } from "@/types/inventory";

import { useProduct } from "./useProduct";

export const useInventoryTables = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>(productData);
  const [product, setProduct] = useState<ToAddProduct>(MOCK_PRODUCT);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [initialInventory, setInitialInventory] = useState<number>(0);
  const [modalStep, setModalStep] = useState<InventoryModalStep>(
    InventoryModalStep.edit
  );

  const { GetDataProducts, DeleteProduct, GetProductByID, UpdateProduct } =
    useProduct();

  const handleSetValueProduct = (
    value: string | number,
    key?: KeyValueTypes
  ) => {
    const keyValue = key || "name";
    if (key === PRODUCT_KEYS.PRICE) value = +value;

    const newProduct = { ...product, [keyValue]: value };

    setProduct(newProduct);
  };

  const handleGetProducts = async () => {
    const newProducts = await GetDataProducts();

    setInventoryData(newProducts);
  };

  const handleGetProduct = async (id: string) => {
    setShowModal(true);
    setIsLoadingModal(true);
    setProductId(id);

    try {
      const productResponse: DocumentData | undefined = await GetProductByID(
        id
      );

      const { category, subcategory, name, price, purchasePrice, inventory } =
        productResponse || {};

      setInitialInventory(inventory);
      const newProduct = {
        ...product,
        category,
        type: subcategory,
        amount: inventory,
        name,
        price,
        purchasePrice,
      };
      setProduct(newProduct);
    } catch {
      throw new Error("Error getting product");
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleDeleteProduct = async () => {
    setIsLoadingModal(true);
    try {
      const response = await DeleteProduct(productId);

      setModalStep(InventoryModalStep.deleteConfirm);
      handleGetProducts();
    } catch {
      throw new Error("Something went wrong");
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleUpdateProduct = () => {
    const response = UpdateProduct(productId, product, initialInventory);
    setIsLoadingModal(true);

    response
      .then((res) => {
        setModalStep(InventoryModalStep.editConfirm);
        handleGetProducts();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoadingModal(false);
      });
  };

  const handleOpenDeleteModal = (id: string) => {
    setShowModal(true);
    setModalStep(InventoryModalStep.delete);
    setProductId(id);
  };

  return {
    inventoryData,
    product,
    showModal,
    isLoadingModal,
    productId,
    initialInventory,
    modalStep,
    setProduct,
    setShowModal,
    setModalStep,
    handleGetProduct,
    handleGetProducts,
    handleDeleteProduct,
    handleOpenDeleteModal,
    handleUpdateProduct,
    handleSetValueProduct,
  };
};
