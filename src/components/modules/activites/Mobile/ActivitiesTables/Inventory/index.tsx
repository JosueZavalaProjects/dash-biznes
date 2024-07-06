import { useEffect } from "react";

import { InventoryModal } from "@/components/modules/inventory/modal";
import { ContainerCard } from "@/components/ui/containerCard";
import { useInventoryTables } from "@/hooks/useInventoryTables";

import { InventoryMobileTable } from "./Table";

const MOCK_INVENTORY = [
  {
    id: "1234",
    name: "Test product",
    category: "test",
    subcategory: "test",
    price: 8,
    inventory: 50,
    dateAdded: "31/12/2023",
  },
  {
    id: "1234",
    name: "Test product",
    category: "test",
    subcategory: "test",
    price: 8,
    inventory: 50,
    dateAdded: "31/12/2023",
  },
  {
    id: "1234",
    name: "Test product",
    category: "test",
    subcategory: "test",
    price: 8,
    inventory: 50,
    dateAdded: "31/12/2023",
  },
  {
    id: "1234",
    name: "Test product",
    category: "test",
    subcategory: "test",
    price: 8,
    inventory: 50,
    dateAdded: "31/12/2023",
  },
  {
    id: "1234",
    name: "Test product",
    category: "test",
    subcategory: "test",
    price: 8,
    inventory: 50,
    dateAdded: "31/12/2023",
  },
];

export const InventoryActivity = () => {
  const {
    inventoryData,
    product,
    showModal,
    isLoadingModal,
    modalStep,
    setShowModal,
    setModalStep,
    handleGetProduct,
    handleGetProducts,
    handleDeleteProduct,
    handleOpenDeleteModal,
    handleUpdateProduct,
    handleSetValueProduct,
  } = useInventoryTables();

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <ContainerCard>
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
      <div className="flex flex-col text-center text-2xl gap-2">
        <div className="text-main-blue font-bold">Inventario</div>
        <div>Inventarios</div>
        {/* <div>Tabla</div> */}
        <InventoryMobileTable
          inventory={inventoryData}
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleGetProduct={handleGetProduct}
        />
      </div>
    </ContainerCard>
  );
};
