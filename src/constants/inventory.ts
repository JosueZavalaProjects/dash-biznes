import { Size as ModalSize } from "@/components/ui/modal";
import { InventoryModalStep, Product } from "@/types/inventory";

export const data: Product[] = [];

export const INVENTORY_MODAL_SIZE: { [key in InventoryModalStep]: ModalSize } =
  {
    [InventoryModalStep.delete]: "md",
    [InventoryModalStep.deleteConfirm]: "md",
    [InventoryModalStep.edit]: "lg",
    [InventoryModalStep.editConfirm]: "lg",
  };
