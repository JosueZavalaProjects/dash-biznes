"use client";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { MOCK_INITIAL_PRODUCTS } from "@/constants/salesPoint/mock";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { ProductCheckout } from "@/types/salesPoint";

import { UpdateSaleModal } from "../../../activites/Desktop/sales/modals/updateModal";
import { Modals } from "../../Mobile/total/components/modals";
import { TotalTable } from "../../Mobile/total/components/table";
import useSalesPointState from "../../states/sales-point-state";

type TotalProps = {
  handleClearOrder: () => void;
};
export const Total = ({ handleClearOrder }: TotalProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialEditProducts, setInitialEditProducts] = useState<
    ProductCheckout[]
  >([MOCK_INITIAL_PRODUCTS]);

  const { products, total, clearSale, updateProduct } = useSalesPointState();
  const { UpdateSale } = useSalesPoint();
  const router = useRouter();

  const handleCancelEdit = () => {
    clearSale();
    router.push("activities");
  };

  const handleUpdateProducts = (products: ProductCheckout[]) => {
    products.map((product) => {
      updateProduct(product);
    });
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

  const SetEditSale = (cookieProducts: any) => {
    clearSale();
    const cookiesProducts = JSON.parse(cookieProducts);
    setInitialEditProducts(cookiesProducts);
    handleUpdateProducts(cookiesProducts);
    setIsEdit(true);
  };

  useEffect(() => {
    // En caso de existir la cookie se esta editando la venta
    const cookieProducts = getCookie("products");

    if (cookieProducts) {
      SetEditSale(cookieProducts);
      return;
    }

    // Verificar si hay productos en el state
    if (products) return;

    clearSale();
  }, []);

  return (
    <section className="w-1/2 rounded-lg p-4 border-2 overflow-y-scroll lg:w-2/5">
      <UpdateSaleModal
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        isLoading={isLoading}
      />
      <Modals
        show={show}
        setShow={setShow}
        handleClearOrder={handleClearOrder}
      />
      <div className="mb-8">
        <Text color="cta" weight="semibold" size="xl">
          Venta Acutal
        </Text>
      </div>
      <div className="flex flex-col justify-between gap-2 w-full">
        <TotalTable products={products} />

        <div className="items-end">
          <div className="flex justify-between items-center p-4 text-gray-800">
            <Text size="2xl" weight="semibold">
              Total
            </Text>
            <div className="flex gap-1 items-center">
              <Text size="xl">$ {total}</Text>
              <Text size="sm">MXN</Text>
            </div>
          </div>
          <div className="grid gap-4 justify-items-center items-center pb-4">
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
              <SimpleButton
                bgColor="gradient-blue"
                onClick={() => setShow(true)}
                disabled={!Boolean(total)}
              >
                Cobrar
              </SimpleButton>
            )}
            <span
              onClick={() => clearSale()}
              className="flex content-center items-center gap-2 text-main-red cursor-pointer font-light"
            >
              <FaTrash /> Borrar la Orden
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
