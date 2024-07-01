"use client";

import type { IconType } from "react-icons/lib";

type SimpleIcon = {
  alt: string;
  icon: IconType;
};
type SquareButtonProps = {
  text: string;
  icon?: SimpleIcon;
  handleClick: () => void;
};
export const SquareButton = ({
  text,
  icon,
  handleClick,
}: SquareButtonProps) => {
  return (
    <button
      onClick={() => handleClick()}
      className="flex p-3 border border-cadet-grey text-sm rounded"
    >
      {icon && (
        <span className="grid justify-items-center items-center h-full pr-2">
          <icon.icon />
        </span>
      )}

      {text}
    </button>
  );
};
