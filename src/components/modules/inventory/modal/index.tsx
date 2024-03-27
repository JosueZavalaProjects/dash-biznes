import Modal from "@/components/ui/modal";
import { Product, ProductKeys } from "@/types/addProduct";

import { EditProduct } from "./EditProduct";
import { EditConfirm } from "./confirmation/EditConfirm";

export enum InventoryModalStep {
  edit,
  delete,
  deleteConfirm,
  editConfirm,
}

type InventoryModalProps = {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  modalStep: InventoryModalStep;
  product: Product;
  handleSetProduct: (value: string | number, key?: ProductKeys) => void;
  isLoading: boolean;
  updateProduct: () => void;
  setModalStep: (step: InventoryModalStep) => void;
};
export const InventoryModal = ({
  showModal,
  setShowModal,
  modalStep = InventoryModalStep.edit,
  product,
  handleSetProduct,
  isLoading,
  updateProduct,
  setModalStep,
}: InventoryModalProps) => {
  const handleContinueAction = () => {
    setModalStep(InventoryModalStep.edit);
    setShowModal(false);
  };
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
      {modalStep === InventoryModalStep.edit && (
        <EditProduct
          product={product}
          handleSetValueProduct={handleSetProduct}
          isLoading={isLoading}
          updateProduct={updateProduct}
          handleCancel={() => setShowModal(false)}
        />
      )}
      {modalStep === InventoryModalStep.editConfirm && (
        <EditConfirm continueAction={handleContinueAction} />
      )}
    </Modal>
  );
};
