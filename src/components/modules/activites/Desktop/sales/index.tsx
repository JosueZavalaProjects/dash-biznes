"use client";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { useSalesTables } from "@/hooks/useSalesTables";

import { DataTable } from "../../../../DataTable";
import { SalesModal } from "./modals/deleteModal";
import { SalesColumns } from "./table/columns";

require("dayjs/locale/es");

export const SalesTable = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    isLoadingModal,
    modalStep,
    startDate,
    endDate,
    sales,
    setModalStep,
    setSaleId,
    HandleEditSale,
    HandleDeleteSale,
    HandleGetSalesByDate,
  } = useSalesTables();

  dayjs.locale("es");

  const handleShowModal = (id: string) => {
    setSaleId(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (!startDate && !endDate) return;

    HandleGetSalesByDate(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="w-full">
      <SalesModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalStep={modalStep}
        deleteSale={HandleDeleteSale}
        isLoading={isLoadingModal}
        setModalStep={setModalStep}
      />
      <DataTable
        columns={SalesColumns({
          handleDeleteSale: handleShowModal,
          handleEditSale: HandleEditSale,
        })}
        data={sales}
      />
    </div>
  );
};
