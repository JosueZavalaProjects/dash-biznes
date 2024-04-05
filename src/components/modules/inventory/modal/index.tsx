import { KeyValueTypes } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { INVENTORY_MODAL_SIZE } from "@/constants/inventory";
import { Product } from "@/types/addProduct";
import { InventoryModalStep } from "@/types/inventory";

import { DeleteConfirm } from "./confirmation/DeleteConfirm";
import { EditConfirm } from "./confirmation/EditConfirm";
import { DeleteProductModal } from "./DeleteProduct";
import { EditProduct } from "./EditProduct";

type InventoryModalProps = {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  modalStep: InventoryModalStep;
  product: Product;
  handleSetProduct: (value: string | number, key?: KeyValueTypes) => void;
  isLoading: boolean;
  updateProduct: () => void;
  deleteProduct: () => Promise<void>;
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
  deleteProduct,
  setModalStep,
}: InventoryModalProps) => {
  const handleContinueAction = () => {
    setModalStep(InventoryModalStep.edit);
    setShowModal(false);
  };
  return (
    <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      size={INVENTORY_MODAL_SIZE[modalStep]}
    >
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
      {modalStep === InventoryModalStep.delete && (
        <DeleteProductModal
          isLoading={isLoading}
          deleteProduct={deleteProduct}
          closeModal={() => setShowModal(false)}
        />
      )}
      {modalStep === InventoryModalStep.deleteConfirm && (
        <DeleteConfirm continueAction={() => setShowModal(false)} />
      )}
    </Modal>
  );
};
