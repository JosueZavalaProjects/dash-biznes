import { DataTable } from "@/components/DataTable";
import { Product } from "@/types/inventory";

import { InventoryMobileColumns } from "./columns";

type InventoryActivityTableProps = {
  inventory: Product[];
  handleOpenDeleteModal: (id: string) => void;
  handleGetProduct: (id: string) => Promise<void>;
};

export const InventoryMobileTable = ({
  inventory,
  handleOpenDeleteModal,
  handleGetProduct,
}: InventoryActivityTableProps) => {
  return (
    <>
      <DataTable
        columns={InventoryMobileColumns({
          handleDeleteProduct: handleOpenDeleteModal,
          handleEditProduct: handleGetProduct,
        })}
        data={inventory}
      />
    </>
  );
};
