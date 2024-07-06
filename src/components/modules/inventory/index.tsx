import { useEffect } from "react";

import { useInventoryTables } from "@/hooks/useInventoryTables";

import { DataTable } from "../../DataTable";
import { InventoryModal } from "./modal";
import { InventoryColumns } from "./table/columns";
import { useWindowWidth } from "@react-hook/window-size";
import { InventoryActivity } from "../activites/Mobile/ActivitiesTables/Inventory";

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

  const MOBILE_WIDTH = 768;
  const onlyWidth = useWindowWidth();

  return (
    <>
      {onlyWidth > MOBILE_WIDTH && (
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
      )}
      {onlyWidth <= MOBILE_WIDTH && <InventoryActivity />}
    </>
  );
};
