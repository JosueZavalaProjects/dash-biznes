import Modal from "@/components/ui/modal";

import useSalesPointState from "../../../states/sales-point-state";
import { Change } from "./change";
import { PaymentAmount } from "./payment-amount";
import { PaymentMethod } from "./payment-method";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const Modals = ({ show, setShow }: ModalProps) => {
  const { paymentStep } = useSalesPointState();
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      {paymentStep === 1 && <PaymentMethod />}
      {paymentStep === 2 && <PaymentAmount />}
      {paymentStep === 3 && <Change setShow={setShow} />}
    </Modal>
  );
};
