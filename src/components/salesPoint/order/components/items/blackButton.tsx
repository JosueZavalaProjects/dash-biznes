"use client";
import Image from "next/image";

import { Icon } from "@/types/sales-point";

type BlackButtonProps = {
  icon: Icon;
  disabled?: boolean;
  setItems: () => void;
};

export const BlackButton = ({
  icon,
  setItems,
  disabled = false,
}: BlackButtonProps) => (
  <button
    className="grid justify-items-center items-center bg-black text-white rounded-lg w-8 h-8 cursor-pointer disabled:bg-main-gray"
    disabled={disabled}
    onClick={() => setItems()}
  >
    <Image src={icon.src} width={20} height={5} alt={icon.alt} />
  </button>
);
