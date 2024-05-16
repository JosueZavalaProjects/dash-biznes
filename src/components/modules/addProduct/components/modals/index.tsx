import { useEffect } from "react";

import { Loading } from "@/components/modals/components/Loading";
import Modal from "@/components/ui/modal";

import { AskConfirmation } from "./askConfirmation";
import { Confirmation } from "./confirmation";

type ModalProps = {
  show: boolean;
  isLoading: boolean;
  modalStep: number;
  setShow: (show: boolean) => void;
  setInventoryStep: (newStep: number) => void;
  handleAddProduct: () => void;
  setModalStep: (newStep: number) => void;
};

export const Modals = ({
  show,
  isLoading,
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
      {isLoading && (
        <div className="grid justify-items-center items-center">
          <Loading />
        </div>
      )}
      {!isLoading && modalStep === 1 && (
        <AskConfirmation
          setInventoryStep={handleSetInventoryStep}
          handleAddProduct={handleAddProduct}
        />
      )}
      {!isLoading && modalStep === 2 && (
        <Confirmation
          setModalStep={setModalStep}
          setInventoryStep={handleSetInventoryStep}
        />
      )}
    </Modal>
  );
};
