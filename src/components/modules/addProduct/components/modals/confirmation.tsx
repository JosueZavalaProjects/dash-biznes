import Image from "next/image";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

import { SuccessIcon } from "../../../../../../public/assets";

type ConfirmationProps = {
  setModalStep: (newStep: number) => void;
  setInventoryStep: (newStep: number) => void;
};

export const Confirmation = ({
  setModalStep,
  setInventoryStep,
}: ConfirmationProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        ¡Listo! Agregaste un nuevo artículo
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => setInventoryStep(2)}>
          Deseas agregar otro producto
        </SimpleButton>
      </div>
      <div className="flex justify-center">
        <SimpleButton onClick={() => setInventoryStep(1)}>
          Ir al Tablero
        </SimpleButton>
      </div>
    </div>
  );
};
