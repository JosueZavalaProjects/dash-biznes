import { DataTable } from "@/components/DataTable";
import { Sale } from "@/types/sales";

import { SalesMobileColumns } from "./columns";

export const SalesActivityTable = () => {
  const MOCK_SALE: Sale[] = [
    {
      id: "1234",
      ticketNumber: "1234",
      date: "4/10/2023",
      total: 234,
      method: "credit",
    },
    {
      id: "1234",
      ticketNumber: "1234",
      date: "4/10/2023",
      total: 234,
      method: "credit",
    },
    {
      id: "1234",
      ticketNumber: "1234",
      date: "4/10/2023",
      total: 234,
      method: "credit",
    },
    {
      id: "1234",
      ticketNumber: "1234",
      date: "4/10/2023",
      total: 234,
      method: "credit",
    },
    {
      id: "1234",
      ticketNumber: "1234",
      date: "4/10/2023",
      total: 234,
      method: "credit",
    },
  ];

  const handleShowModal = (id: string) => {
    /* setSaleId(id);
    setShowModal(true); */
  };

  const handleEditSale = async (id: string) => {
    /* const saleReponse: DocumentData | undefined = await GetSaleByID(id);
    const { products } = saleReponse || {};

    setCookie("products", JSON.stringify(products));
    setCookie("saleID", id);
    router.push("/salesPoint"); */
  };

  return (
    <DataTable
      columns={SalesMobileColumns({
        handleDeleteSale: handleShowModal,
        handleEditSale,
      })}
      data={MOCK_SALE}
    />
  );
};
