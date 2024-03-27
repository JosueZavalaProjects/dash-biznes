import { useEffect, useState } from "react";

import { DocumentData } from "firebase/firestore";

import { MOCK_PRODUCT, PRODUCT_KEYS } from "@/constants/addProduct";
import { data as productData } from "@/constants/inventory";
import { useProduct } from "@/hooks/useProduct";
import { Product as ToAddProduct, ProductKeys } from "@/types/addProduct";
import { Product } from "@/types/inventory";

import { DataTable } from "../../DataTable";
import { InventoryModal, InventoryModalStep } from "./modal";
import { InventoryColumns } from "./table/columns";

export const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>(productData);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [productId, setProductId] = useState<string>("");
  const [modalStep, setModalStep] = useState<InventoryModalStep>(
    InventoryModalStep.edit
  );
  const [product, setProduct] = useState<ToAddProduct>(MOCK_PRODUCT);

  const { GetDataProducts, DeleteProduct, GetProductByID, UpdateProduct } =
    useProduct();

  const handleGetProducts = async () => {
    const newProducts = await GetDataProducts();

    setInventoryData(newProducts);
  };
  const handleDeleteProduct = async (id: string) => {
    const response = await DeleteProduct(id);
    console.log({ id });
  };

  const handleGetProduct = async (id: string) => {
    setShowModal(true);
    setIsLoadingModal(true);
    setProductId(id);
    try {
      const productResponse: DocumentData | undefined = await GetProductByID(
        id
      );

      const { category, subcategory, name, price, purchasePrice } =
        productResponse || {};

      const newProduct = {
        ...product,
        category,
        type: subcategory,
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

  const handleSetValueProduct = (value: string | number, key?: ProductKeys) => {
    const keyValue = key || "name";
    if (key === PRODUCT_KEYS.PRICE) value = +value;

    const newProduct = { ...product, [keyValue]: value };

    setProduct(newProduct);
  };

  const handleUpdateProduct = () => {
    const response = UpdateProduct(productId, product);
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

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <InventoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalStep={modalStep}
        product={product}
        handleSetProduct={handleSetValueProduct}
        isLoading={isLoadingModal}
        updateProduct={handleUpdateProduct}
        setModalStep={setModalStep}
      />
      <DataTable
        columns={InventoryColumns({
          handleDeleteProduct: handleDeleteProduct,
          handleEditProduct: handleGetProduct,
        })}
        data={inventoryData}
      />
    </>
  );
};
