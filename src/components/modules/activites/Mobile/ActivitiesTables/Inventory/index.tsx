import { useEffect } from "react";

import { InventoryModal } from "@/components/modules/inventory/modal";
import { ContainerCard } from "@/components/ui/containerCard";
import { useInventoryTables } from "@/hooks/useInventoryTables";

import { InventoryMobileTable } from "./Table";

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
        <InventoryMobileTable
          inventory={inventoryData}
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleGetProduct={handleGetProduct}
        />
      </div>
    </ContainerCard>
  );
};
