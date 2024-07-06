"use client";
import { useEffect, useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { useDates } from "@/hooks/useDates";
import { useSalesTables } from "@/hooks/useSalesTables";
import { LabelText, TimeOption, colorLabel } from "@/types/activities";

import { SalesModal } from "../../../Desktop/sales/modals/deleteModal";
import { SummaryLabel } from "../../components/SummaryLabel";
import { TimeOptions } from "../../components/TimeOptions";
import { SalesActivityTable } from "./Table";

type datesType = { startDate?: string; endDate?: string };

export const SalesActivity = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [timeOptionSelected, setTimeOptionSelected] = useState<TimeOption>(
    TimeOption.day
  );

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
  const {
    GetCurrentDayDates,
    GetCurrentWeekDates,
    GetCurrentMonthDates,
    GetCurrentYearDates,
  } = useDates();

  const handleShowModal = (id: string) => {
    setSaleId(id);
    setShowModal(true);
  };

  const handleSetDates = () => {
    if (timeOptionSelected === TimeOption.day) return GetCurrentDayDates();
    if (timeOptionSelected === TimeOption.week) return GetCurrentWeekDates();
    if (timeOptionSelected === TimeOption.month) return GetCurrentMonthDates();
    if (timeOptionSelected === TimeOption.year) return GetCurrentYearDates();

    return { startDate: "", endDate: "" };
  };

  const handleCalculateTotalSales = () =>
    sales.length ? sales.map((sale) => sale.total).reduce((a, b) => a + b) : 0;

  useEffect(() => {
    setTotalSales(handleCalculateTotalSales());
  }, [sales]);

  useEffect(() => {
    const { startDate, endDate }: datesType = handleSetDates();

    if (!startDate && !endDate) return;

    HandleGetSalesByDate(startDate, endDate);
  }, [timeOptionSelected]);

  return (
    <ContainerCard>
      <SalesModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalStep={modalStep}
        deleteSale={HandleDeleteSale}
        isLoading={isLoadingModal}
        setModalStep={setModalStep}
      />
      <div className="flex flex-col text-center text-2xl gap-6">
        <div className="text-main-blue font-bold">{`Ventas ${LabelText[timeOptionSelected]}`}</div>
        <TimeOptions
          timeOptionSelected={timeOptionSelected}
          setTimeOptionSelected={setTimeOptionSelected}
        />
        <SummaryLabel
          text={`Ventas ${LabelText[timeOptionSelected]}`}
          color={colorLabel.green}
          amount={totalSales}
        />

        <SalesActivityTable
          sales={sales}
          handleEditSale={HandleEditSale}
          handleShowModal={handleShowModal}
        />
      </div>
    </ContainerCard>
  );
};
