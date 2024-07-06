import { DataTable } from "@/components/DataTable";
import { Sale } from "@/types/sales";

import { SalesMobileColumns } from "./columns";

type SalesActivityTableProps = {
  sales: Sale[];
  handleEditSale: (id: string) => Promise<void>;
  handleShowModal: (id: string) => void;
};

export const SalesActivityTable = ({
  sales,
  handleEditSale,
  handleShowModal,
}: SalesActivityTableProps) => {
  return (
    <>
      <DataTable
        columns={SalesMobileColumns({
          handleDeleteSale: handleShowModal,
          handleEditSale: handleEditSale,
        })}
        data={sales}
      />
    </>
  );
};
