import { useEffect } from "react";

import Modal from "@/components/ui/modal";

import { AskConfirmation } from "./askConfirmation";
import { Confirmation } from "./confirmation";

type ModalProps = {
  show: boolean;
  modalStep: number;
  setShow: (show: boolean) => void;
  setInventoryStep: (newStep: number) => void;
  handleAddProduct: () => void;
  setModalStep: (newStep: number) => void;
};

export const Modals = ({
  show,
  modalStep,
  setShow,
  setInventoryStep,
  handleAddProduct,
  setModalStep,
}: ModalProps) => {
  const handleSetInventoryStep = (inventoryStep: number) => {
    setShow(false);
    setInventoryStep(inventoryStep);
  };

  useEffect(() => {
    if (!show) setModalStep(1);
  }, [show]);
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      {modalStep === 1 && (
        <AskConfirmation
          setInventoryStep={handleSetInventoryStep}
          handleAddProduct={handleAddProduct}
        />
      )}
      {modalStep === 2 && (
        <Confirmation
          setModalStep={setModalStep}
          setInventoryStep={handleSetInventoryStep}
        />
      )}
    </Modal>
  );
};
