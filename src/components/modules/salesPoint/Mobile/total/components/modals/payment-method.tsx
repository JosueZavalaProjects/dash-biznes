import { useEffect } from "react";

import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import { useSalesPoint } from "@/hooks/useSalesPoint";

export const PaymentMethod = () => {
  const { setPaymentMethod, setPaymentStep, setPayment, total, paymentMethod } =
    useSalesPointState();
  const { CreateSale } = useSalesPoint();

  const handleChangePaymentMethod = async () => {
    if (paymentMethod === "cash") {
      setPaymentStep(2);
      return;
    }

    setPayment(total);
    await CreateSale();
    setPaymentStep(3);
  };

  useEffect(() => {
    if (!paymentMethod) return;

    handleChangePaymentMethod();
  }, [paymentMethod]);
  return (
    <div className="grid justify-items-center gap-4 text-black">
      <div>
        <SimpleButton
          onClick={() => setPaymentMethod("cash")}
          className={"px-8 py-4"}
        >
          Efectivo
        </SimpleButton>
      </div>
      <div className="flex w-full justify-between">
        <SimpleButton
          onClick={() => setPaymentMethod("credit")}
          className={"px-8 py-4"}
        >
          Crédito
        </SimpleButton>
        <SimpleButton
          onClick={() => setPaymentMethod("debit")}
          className={"px-8 py-4"}
        >
          Débito
        </SimpleButton>
      </div>
      <div>
        <SimpleButton
          onClick={() => setPaymentMethod("transfer")}
          className={"px-8 py-4"}
        >
          Transferencia
        </SimpleButton>
      </div>
    </div>
  );
};
