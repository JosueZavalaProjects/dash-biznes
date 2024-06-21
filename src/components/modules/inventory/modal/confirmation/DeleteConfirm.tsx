import Image from "next/image";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

import { SuccessIcon } from "../../../../../../public/assets";

type DeleteConfirmProps = {
  continueAction: () => void;
};
export const DeleteConfirm = ({ continueAction }: DeleteConfirmProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        ¡Listo! Articulo Eliminado
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => continueAction()}>Continuar</SimpleButton>
      </div>
    </div>
  );
};
