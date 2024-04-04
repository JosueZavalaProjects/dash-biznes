import { useEffect, useState } from "react";

import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";

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

  const { GetDataSales, DeleteSale, GetSaleByID } = useSales();
  const router = useRouter();
  dayjs.locale("es");

  const handleGetSales = async () => {
    const newProducts = await GetDataSales();

    setSales(newProducts);
  };

  const handleEditSale = async (id: string) => {
    const saleReponse: DocumentData | undefined = await GetSaleByID(id);
    const { products } = saleReponse || {};

    setCookie("products", JSON.stringify(products));
    setCookie("saleID", id);
    router.push("/salesPoint");
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
