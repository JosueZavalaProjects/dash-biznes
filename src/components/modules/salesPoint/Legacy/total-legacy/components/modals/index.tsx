import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import Modal from "@/components/ui/modal";

import { Change } from "./change";
import { PaymentAmount } from "./payment-amount";
import { PaymentMethod } from "./payment-method";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  handleClearOrder: () => void;
};

export const Modals = ({ show, setShow, handleClearOrder }: ModalProps) => {
  const { paymentStep, setPayment, setPaymentStep, setPaymentMethod } =
    useSalesPointState();
  const handleCloseModal = () => {
    setPayment(0);
    setPaymentMethod("");
    setPaymentStep(1);
    setShow(false);
  };
  return (
    <Modal show={show} onClose={() => handleCloseModal()}>
      {paymentStep === 1 && <PaymentMethod />}
      {paymentStep === 2 && <PaymentAmount />}
      {paymentStep === 3 && (
        <Change setShow={setShow} handleClearOrder={handleClearOrder} />
      )}
    </Modal>
  );
};
