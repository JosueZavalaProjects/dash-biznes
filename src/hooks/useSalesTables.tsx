import { useState } from "react";

import { setCookie } from "cookies-next";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";

import useActivitiesDateState from "@/components/modules/activites/Desktop/states/activities-dates-state";
import { data as SalesData } from "@/constants/activities/sales";
import { Sale, SalesModalStep } from "@/types/sales";

import { useSales } from "./useSales";

export const useSalesTables = () => {
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [saleId, setSaleId] = useState<string>("");
  const [sales, setSales] = useState<Sale[]>(SalesData);
  const [modalStep, setModalStep] = useState<SalesModalStep>(
    SalesModalStep.delete
  );
  const { startDate, endDate } = useActivitiesDateState();

  const { DeleteSale, GetSalesByDate, GetSaleByID } = useSales();
  const router = useRouter();

  const handleGetSalesByDate = async (startDate: string, endDate: string) => {
    const result = await GetSalesByDate(startDate, endDate);

    setSales(result);
  };

  const handleEditSale = async (id: string) => {
    const saleReponse: DocumentData | undefined = await GetSaleByID(id);
    const { products } = saleReponse || {};

    setCookie("products", JSON.stringify(products));
    setCookie("saleID", id);
    router.push("/salesPoint");
  };

  const handleDeleteSale = async () => {
    setIsLoadingModal(true);
    try {
      const response = await DeleteSale(saleId);
      setModalStep(SalesModalStep.deleteConfirm);

      handleGetSalesByDate(startDate, endDate);
    } catch {
      throw new Error("Something went wrong");
    } finally {
      setIsLoadingModal(false);
    }
  };

  return {
    isLoadingModal,
    modalStep,
    saleId,
    startDate,
    endDate,
    sales,
    setIsLoadingModal,
    setModalStep,
    setSaleId,
    HandleEditSale: handleEditSale,
    HandleDeleteSale: handleDeleteSale,
    HandleGetSalesByDate: handleGetSalesByDate,
  };
};
