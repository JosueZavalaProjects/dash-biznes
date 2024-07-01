"use client";
import { useEffect } from "react";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";

import { MinusIcon, PlusIcon } from "../../../../../../../public/assets";
import { BlackButton } from "./blackButton";

type AddItemsProps = {
  items: number;
  setItems: (value: number) => void;
  disabled: boolean;
  addProduct: () => void;
  inventory: number;
};

export const AddItems = ({
  items,
  setItems,
  disabled,
  addProduct,
  inventory,
}: AddItemsProps) => {
  useEffect(() => {
    if (inventory <= items) {
      setItems(inventory);
    }
  }, [inventory]);
  return (
    <div className="flex justify-between gap-4 p-2">
      <div className="flex items-center gap-3">
        <BlackButton
          icon={{ src: MinusIcon, alt: "minus icon" }}
          setItems={() => setItems(items - 1)}
          disabled={items <= 0}
        />
        <div className="grid justify-items-center items-center min-w-16 text-5xl">
          {items}
        </div>
        <BlackButton
          icon={{ src: PlusIcon, alt: "plus icon" }}
          setItems={() => setItems(items + 1)}
          disabled={inventory <= items}
        />
      </div>
      <div className="grid justify-items-center items-center">
        <SimpleButton
          bgColor="malachite-green"
          disabled={disabled}
          onClick={() => addProduct()}
        >
          Agregar
        </SimpleButton>
      </div>
    </div>
  );
};
