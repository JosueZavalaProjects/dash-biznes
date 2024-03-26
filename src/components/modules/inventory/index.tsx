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
  const [modalStep, setModalStep] = useState<InventoryModalStep>(
    InventoryModalStep.edit
  );
  const [product, setProduct] = useState<ToAddProduct>(MOCK_PRODUCT);

  const { GetDataProducts, DeleteProduct, GetProductByID } = useProduct();

  const handleGetProducts = async () => {
    const newProducts = await GetDataProducts();

    setInventoryData(newProducts);
  };
  const handleDeleteProduct = async (id: string) => {
    const response = await DeleteProduct(id);
    console.log({ id });
  };

  const handleEditProduct = async (id: string) => {
    setShowModal(true);
    const productResponse: DocumentData | undefined = await GetProductByID(id);

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
  };

  const handleSetValueProduct = (value: string | number, key?: ProductKeys) => {
    const keyValue = key || "name";
    if (key === PRODUCT_KEYS.PRICE) value = +value;
    if (typeof value === "string") value = value.toLowerCase();

    const newProduct = { ...product, [keyValue]: value };

    setProduct(newProduct);
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
      />
      <DataTable
        columns={InventoryColumns({
          handleDeleteProduct: handleDeleteProduct,
          handleEditProduct: handleEditProduct,
        })}
        data={inventoryData}
      />
    </>
  );
};
