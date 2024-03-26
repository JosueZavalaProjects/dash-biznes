import Modal from "@/components/ui/modal";
import { Product, ProductKeys } from "@/types/addProduct";

import { EditProduct } from "./EditProduct";

export enum InventoryModalStep {
  edit,
  delete,
  deleteConfirm,
}

type InventoryModalProps = {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  modalStep: InventoryModalStep;
  product: Product;
  handleSetProduct: (value: string | number, key?: ProductKeys) => void;
  isLoading: boolean;
};
export const InventoryModal = ({
  showModal,
  setShowModal,
  modalStep = InventoryModalStep.edit,
  product,
  handleSetProduct,
  isLoading,
}: InventoryModalProps) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
      {modalStep === InventoryModalStep.edit && (
        <EditProduct
          product={product}
          handleSetValueProduct={handleSetProduct}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};
