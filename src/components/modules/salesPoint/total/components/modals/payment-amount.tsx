import { useState } from "react";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";

import useSalesPointState from "../../../states/sales-point-state";

export const PaymentAmount = () => {
  const [inputNumber, setInputNumber] = useState();
  const { setPayment, setPaymentStep } = useSalesPointState();

  const handleNextStep = (PaymentAmount: number) => {
    setPayment(PaymentAmount);
    setPaymentStep(3);
  };

  return (
    <div className="grid justify-items-center gap-4 text-black">
      <Text color="silver" size="2xl">
        El cliente pago con:
      </Text>
      <div className="text-old-silver"></div>
      <SimpleButton onClick={() => handleNextStep(100)} className={"px-8 py-4"}>
        100 MXN
      </SimpleButton>
      <SimpleButton onClick={() => handleNextStep(200)} className={"px-8 py-4"}>
        200 MXN
      </SimpleButton>
      <SimpleButton onClick={() => handleNextStep(500)} className={"px-8 py-4"}>
        500 MXN
      </SimpleButton>
      <SimpleButton
        onClick={() => handleNextStep(1000)}
        className={"px-8 py-4"}
      >
        1,000 MXN
      </SimpleButton>
      <div className="flex flex-row justify-stretch items-center w-32 px-2 py-2  text-3xl border border-black rounded-xl overflow-hidden">
        <div className="py-0 pr-2 text-gray-400">$</div>
        <input
          value={inputNumber}
          onChange={(e: any) => setInputNumber(e.target.value)}
          className="flex-1 w-full pl-2 focus:outline-none"
          type="number"
        />
      </div>
      {inputNumber && (
        <div className="pt-4">
          <SimpleButton
            onClick={() => handleNextStep(inputNumber)}
            bgColor="gray"
            className={"px-8 py-4"}
          >
            Siguiente
          </SimpleButton>
        </div>
      )}
    </div>
  );
};
