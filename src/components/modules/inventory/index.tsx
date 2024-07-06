import { useEffect } from "react";

import { useInventoryTables } from "@/hooks/useInventoryTables";

import { DataTable } from "../../DataTable";
import { InventoryModal } from "./modal";
import { InventoryColumns } from "./table/columns";

export const InventoryTable = () => {
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
    <>
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
      <DataTable
        columns={InventoryColumns({
          handleDeleteProduct: handleOpenDeleteModal,
          handleEditProduct: handleGetProduct,
        })}
        data={inventoryData}
      />
    </>
  );
};
