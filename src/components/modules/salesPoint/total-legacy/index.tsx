"use client";
import { useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import dayjs from "dayjs";
require("dayjs/locale/es");
import { useRouter } from "next/navigation";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import { ContainerCard } from "@/components/ui/containerCard";
import Text from "@/components/ui/text";
import { TAB_KEYS } from "@/constants/salesPoint";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { ProductCheckout } from "@/types/salesPoint";

import { UpdateSaleModal } from "../../activites/sales/modals/updateModal";
import useSalesPointState from "../states/sales-point-state";
import { Modals } from "./components/modals";
import { TotalTable } from "./components/table";

const MOCK_INITIAL_PRODUCTS: ProductCheckout = {
  id: "",
  name: "",
  price: 0,
  category: "",
  subcategory: "",
  inventory: 0,
  amount: 0,
};

export const Total = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [initialEditProducts, setInitialEditProducts] = useState<
    ProductCheckout[]
  >([MOCK_INITIAL_PRODUCTS]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { products, total, clearSale, updateProduct, setTabName } =
    useSalesPointState();
  const { UpdateSale } = useSalesPoint();
  const router = useRouter();

  dayjs.locale("es");

  const handleUpdateProducts = (products: ProductCheckout[]) => {
    products.map((product) => {
      updateProduct(product);
    });
  };

  const handleCancelEdit = () => {
    clearSale();
    router.push("activities");
  };

  const handleUpdateSale = async () => {
    const saleId = getCookie("saleID");
    setShowUpdateModal(true);

    if (!saleId) {
      console.log("No hay id de la venta para actualizar");
      return;
    }
    try {
      setIsLoading(true);
      const response = await UpdateSale(saleId, initialEditProducts);
    } catch (e) {
      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // En caso de existir la cookie se esta editando la venta
    const products = getCookie("products");
    if (products) {
      clearSale();
      const cookiesProducts = JSON.parse(products);
      setInitialEditProducts(cookiesProducts);
      handleUpdateProducts(cookiesProducts);
      setTabName(TAB_KEYS.TOTAL);
      setIsEdit(true);
      return;
    }
    clearSale();
  }, []);

  return (
    <ContainerCard>
      <UpdateSaleModal
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        isLoading={isLoading}
      />
      <Modals show={show} setShow={setShow} handleClearOrder={() => {}} />
      <div className="grid gap-2">
        <div className="grid p-2">
          <Text color="silver" size="sm" className="capitalize">
            {dayjs(Date().toString()).format("DD [de] MMMM YYYY")}
          </Text>
          <Text color="silver" size="sm" className="capitalize">
            Caja 1
          </Text>
        </div>
        <div className="grid gap-2 w-full">
          <TotalTable products={products} />
          <div className="flex justify-between items-center p-4 text-gray-800">
            <Text size="4xl" weight="semibold">
              Total
            </Text>
            <div className="flex gap-1 items-center">
              <Text size="2xl">$ {total}</Text>
              <Text size="lg">MXN</Text>
            </div>
          </div>
          <div className="grid justify-items-center items-center pb-4">
            {isEdit && (
              <div className="flex gap-4">
                <SimpleButton bgColor="gray" onClick={() => handleCancelEdit()}>
                  Cancelar
                </SimpleButton>
                <SimpleButton onClick={() => handleUpdateSale()}>
                  Guardar
                </SimpleButton>
              </div>
            )}
            {!isEdit && (
              <button
                onClick={() => setShow(true)}
                className="border rounded-xl py-2 px-6 bg-gray-400 text-white"
              >
                Cobrar
              </button>
            )}
          </div>
        </div>
      </div>
    </ContainerCard>
  );
};
