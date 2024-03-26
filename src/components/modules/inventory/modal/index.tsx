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
};
export const InventoryModal = ({
  showModal,
  setShowModal,
  modalStep = InventoryModalStep.edit,
  product,
}: InventoryModalProps) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} size="lg">
      {modalStep === InventoryModalStep.edit && (
        <EditProduct product={product} />
      )}
    </Modal>
  );
};
