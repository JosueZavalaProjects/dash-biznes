import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { DataTable } from "@/components/DataTable";
import { SalesModal } from "@/components/modules/activites/Desktop/sales/modals/deleteModal";
import { useSalesTables } from "@/hooks/useSalesTables";
import { TimeOption } from "@/types/activities";

import { SalesMobileColumns } from "./columns";
import { useDates } from "@/hooks/useDates";

type datesType = { startDate?: string; endDate?: string };

export const SalesActivityTable = ({
  timeOptionSelected,
}: {
  timeOptionSelected: TimeOption;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    isLoadingModal,
    modalStep,
    sales,
    setModalStep,
    setSaleId,
    HandleEditSale,
    HandleDeleteSale,
    HandleGetSalesByDate,
  } = useSalesTables();
  const { GetCurrentDayDates, GetCurrentMonthDates, GetCurrentYearDates } =
    useDates();

  dayjs.locale("es");

  const handleShowModal = (id: string) => {
    setSaleId(id);
    setShowModal(true);
  };

  const handleSetDates = () => {
    if (timeOptionSelected === TimeOption.day) return GetCurrentDayDates();
    if (timeOptionSelected === TimeOption.month) return GetCurrentMonthDates();
    if (timeOptionSelected === TimeOption.year) return GetCurrentYearDates();

    return { startDate: "", endDate: "" };
  };

  useEffect(() => {
    const { startDate, endDate }: datesType = handleSetDates();
    if (!startDate && !endDate) return;

    HandleGetSalesByDate(startDate, endDate);
  }, [timeOptionSelected]);

  return (
    <>
      <SalesModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalStep={modalStep}
        deleteSale={HandleDeleteSale}
        isLoading={isLoadingModal}
        setModalStep={setModalStep}
      />
      <DataTable
        columns={SalesMobileColumns({
          handleDeleteSale: handleShowModal,
          handleEditSale: HandleEditSale,
        })}
        data={sales}
      />
    </>
  );
};
