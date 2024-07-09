import Image from "next/image";

import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

import { SuccessIcon } from "../../../../../../../../public/assets";

type ChangeProps = {
  setShow: (show: boolean) => void;
  handleClearOrder: () => void;
};
export const Change = ({ setShow, handleClearOrder }: ChangeProps) => {
  const { payment, total, clearSale, setPaymentStep } = useSalesPointState();

  const handleNextStep = () => {
    clearSale();
    setPaymentStep(4);
    setShow(false);
    handleClearOrder();
  };

  return (
    <div className="grid justify-items-center gap-4 text-black">
      <Image src={SuccessIcon} width={108} height={80} alt="success" />
      <Text color="silver" size="2xl">
        El cambio es: {payment - total} MXN
      </Text>
      <div className="text-old-silver"></div>
      <SimpleButton onClick={() => handleNextStep()} className={"px-8 py-4"}>
        Hacer otra Venta
      </SimpleButton>
    </div>
  );
};
