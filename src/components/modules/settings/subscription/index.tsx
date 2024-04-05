"use client";
import { useState } from "react";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";

import { SubcriptionModal } from "./modals";

export const Subscription = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="grid gap-16 px-8">
      <SubcriptionModal show={showModal} setShow={setShowModal} />
      <Text size="3xl" color="dark">
        Subscripción
      </Text>
      <div className="grid gap-4">
        <div className="flex justify-between border-b-2 pb-4">
          <Text color="dark" className="self-center">
            Usuario
          </Text>
        </div>
        <div className="grid pt-8 gap-4">
          <div className="grid gap-4 w-full border border-gray-300 rounded-lg p-6 pb-16">
            <Text size="2xl" weight="bold" className="!text-main-blue">
              Biznes.
            </Text>
            <div className="flex w-full gap-8">
              <Text size="xl" weight="bold" className="w-1/3">
                Tipo de Subscripción
              </Text>
              <Text size="xl" color="dark" weight="semibold" className="w-2/3">
                Premium
              </Text>
            </div>
            <div className="flex w-full gap-8">
              <Text size="xl" weight="bold" className="w-1/3">
                Pago
              </Text>
              <Text size="xl" color="dark" weight="semibold" className="w-2/3">
                100 mx mensuales (impuestos incluidos)
              </Text>
            </div>
            <div className="flex w-full gap-8">
              <Text size="xl" weight="bold" className="w-1/3">
                Válido hasta
              </Text>
              <Text size="xl" color="dark" weight="semibold" className="w-2/3">
                15 Junio 2024
              </Text>
            </div>
          </div>

          <div className="grid gap-4">
            <Text color="dark" size="lg" weight="semibold">
              Cancelar tu Subscripción
            </Text>
            <Text>
              Una vez que canceles tu subscripción expirará al final de tu
              periodo de subscripción y tu tarjeta ya no será cargada. Recuerda
              que puedes reiniciar tu subscripción en cualquier momento.
            </Text>
            <div className="">
              <SimpleButton onClick={() => setShowModal(true)}>
                Cancelar tu subscripción
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
