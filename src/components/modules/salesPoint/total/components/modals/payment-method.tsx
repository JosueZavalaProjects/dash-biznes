import { SimpleButton } from "@/components/ui/simpleButton";
import { useSalesPoint } from "@/hooks/useSalesPoint";
import { PaymentMethod as MethodType } from "@/types/UI/common";

import useSalesPointState from "../../../states/sales-point-state";

export const PaymentMethod = () => {
  const { setPaymentMethod, setPaymentStep, setPayment, total } =
    useSalesPointState();
  const { CreateSale } = useSalesPoint();

  const handleSelectPayment = async (paymentMethod: MethodType) => {
    setPaymentMethod(paymentMethod);
    if (paymentMethod === "cash") {
      setPaymentStep(2);
      return;
    }

    setPayment(total);
    await CreateSale();
    setPaymentStep(3);
  };
  return (
    <div className="grid justify-items-center gap-4 text-black">
      <div>
        <SimpleButton
          onClick={() => handleSelectPayment("cash")}
          className={"px-8 py-4"}
        >
          Efectivo
        </SimpleButton>
      </div>
      <div className="flex w-full justify-between">
        <SimpleButton
          onClick={() => handleSelectPayment("credit")}
          className={"px-8 py-4"}
        >
          Crédito
        </SimpleButton>
        <SimpleButton
          onClick={() => handleSelectPayment("debit")}
          className={"px-8 py-4"}
        >
          Débito
        </SimpleButton>
      </div>
      <div>
        <SimpleButton
          onClick={() => handleSelectPayment("transfer")}
          className={"px-8 py-4"}
        >
          Transferencia
        </SimpleButton>
      </div>
    </div>
  );
};
