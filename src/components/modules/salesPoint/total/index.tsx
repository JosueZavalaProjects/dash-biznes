import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

import useSalesPointState from "../states/sales-point-state";
import { TotalTable } from "../total-legacy/components/table";

export const Total = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { products, total, clearSale } = useSalesPointState();

  return (
    <section className="w-2/5 rounded-lg p-4 border-2 overflow-y-scroll">
      <div className="mb-8">
        <Text color="cta" weight="semibold" size="xl">
          Venta Acutal
        </Text>
      </div>
      <div className="flex flex-col justify-between gap-2 w-full">
        <TotalTable products={products} />

        <div className="items-end">
          <div className="flex justify-between items-center p-4 text-gray-800">
            <Text size="4xl" weight="semibold">
              Total
            </Text>
            <div className="flex gap-1 items-center">
              <Text size="2xl">$ {total}</Text>
              <Text size="lg">MXN</Text>
            </div>
          </div>
          <div className="grid gap-4 justify-items-center items-center pb-4">
            {isEdit && (
              <div className="flex gap-4">
                <SimpleButton bgColor="gray" onClick={() => {}}>
                  Cancelar
                </SimpleButton>
                <SimpleButton onClick={() => {}}>Guardar</SimpleButton>
              </div>
            )}
            {!isEdit && (
              <SimpleButton bgColor="gradient-blue">Cobrar</SimpleButton>
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
