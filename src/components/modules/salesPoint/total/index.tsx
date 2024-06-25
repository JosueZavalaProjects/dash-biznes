import { useState } from "react";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

import { TotalTable } from "../total-legacy/components/table";

export const Total = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className="w-2/5 rounded-lg p-4 border-2 overflow-y-scroll">
      <div className="mb-8">
        <Text color="cta" weight="semibold" size="xl">
          Venta Acutal
        </Text>
      </div>
      <div className="grid gap-2 w-full">
        <TotalTable products={[]} />
        <div className="flex justify-between items-center p-4 text-gray-800">
          <Text size="4xl" weight="semibold">
            Total
          </Text>
          <div className="flex gap-1 items-center">
            <Text size="2xl">$ 0</Text>
            <Text size="lg">MXN</Text>
          </div>
        </div>
        <div className="grid justify-items-center items-center pb-4">
          {isEdit && (
            <div className="flex gap-4">
              <SimpleButton bgColor="gray" onClick={() => {}}>
                Cancelar
              </SimpleButton>
              <SimpleButton onClick={() => {}}>Guardar</SimpleButton>
            </div>
          )}
          {!isEdit && (
            <button
              onClick={() => {}}
              className="border rounded-xl py-2 px-6 bg-gray-400 text-white"
            >
              Cobrar
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
