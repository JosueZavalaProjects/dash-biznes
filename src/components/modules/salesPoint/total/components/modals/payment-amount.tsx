import { useState } from "react";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { useSalesPoint } from "@/hooks/useSalesPoint";

import useSalesPointState from "../../../states/sales-point-state";

export const PaymentAmount = () => {
  const [inputNumber, setInputNumber] = useState();
  const { setPayment, setPaymentStep, total } = useSalesPointState();
  const { CreateSale } = useSalesPoint();

  const handleNextStep = async (PaymentAmount: number) => {
    await CreateSale(PaymentAmount);
    setPayment(PaymentAmount);
    setPaymentStep(3);
  };

  return (
    <div className="grid justify-items-center gap-4 text-black">
      <Text color="silver" size="2xl">
        El cliente pago con:
      </Text>
      <div className="text-old-silver"></div>
      <SimpleButton
        disabled={total > 100}
        onClick={() => handleNextStep(100)}
        className={"px-8 py-4"}
      >
        100 MXN
      </SimpleButton>
      <SimpleButton
        disabled={total > 200}
        onClick={() => handleNextStep(200)}
        className={"px-8 py-4"}
      >
        200 MXN
      </SimpleButton>
      <SimpleButton
        disabled={total > 500}
        onClick={() => handleNextStep(500)}
        className={"px-8 py-4"}
      >
        500 MXN
      </SimpleButton>
      <SimpleButton
        disabled={total > 1000}
        onClick={() => handleNextStep(1000)}
        className={"px-8 py-4"}
      >
        1,000 MXN
      </SimpleButton>
      <div className="flex flex-row justify-stretch items-center w-40 px-2 py-2  text-3xl border border-black rounded-xl overflow-hidden">
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
            disabled={total > inputNumber}
            onClick={() => handleNextStep(inputNumber)}
            className={"px-8 py-4"}
          >
            Siguiente
          </SimpleButton>
        </div>
      )}
    </div>
  );
};
