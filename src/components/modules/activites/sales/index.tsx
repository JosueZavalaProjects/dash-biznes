import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { data as SalesData } from "@/constants/activities/sales";
import { useSales } from "@/hooks/useSales";
import { Sale, SalesModalStep } from "@/types/sales";

import { DataTable } from "../../../DataTable";
import { SalesModal } from "./modals/deleteModal";
import { SalesColumns } from "./table/columns";

require("dayjs/locale/es");

export const SalesTable = () => {
  const [sales, setSales] = useState<Sale[]>(SalesData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [saleId, setSaleId] = useState<string>("");
  const [modalStep, setModalStep] = useState<SalesModalStep>(
    SalesModalStep.delete
  );

  const { GetDataSales, DeleteSale } = useSales();
  dayjs.locale("es");

  const handleGetSales = async () => {
    const newProducts = await GetDataSales();

    setSales(newProducts);
  };

  const handleEditSale = (id: string) => {
    console.log(id);
  };

  const handleShowModal = (id: string) => {
    console.log(id);
    setSaleId(id);
    setShowModal(true);
  };

  const handleDeleteSale = async () => {
    setIsLoadingModal(true);
    try {
      const response = await DeleteSale(saleId);
      console.log({ response });
      setModalStep(SalesModalStep.deleteConfirm);
      handleGetSales();
      //TODO: Modal Delete confirm
    } catch {
      throw new Error("Something went wrong");
    } finally {
      setIsLoadingModal(false);
    }
  };

  useEffect(() => {
    handleGetSales();
  }, []);

  return (
    <>
      <SalesModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalStep={modalStep}
        deleteSale={handleDeleteSale}
        isLoading={isLoadingModal}
        setModalStep={setModalStep}
      />
      <DataTable
        columns={SalesColumns({
          handleDeleteSale: handleShowModal,
          handleEditSale,
        })}
        data={sales}
      />
    </>
  );
};
