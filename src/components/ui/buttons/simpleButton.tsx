"use client";
import cn from "classnames";

import { BgColor } from "@/types/UI/common";

type ButtonProps = {
  onClick?: () => void;
  bgColor?: BgColor;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export const backgroundColors = {
  white: "bg-white",
  gray: "bg-gray-400",
  dark: "bg-gray-800",
  primary: "bg-primary",
  cta: "bg-cta-600",
  positive: "bg-positive-600",
  negative: "bg-negative-600",
  caution: "bg-caution-600",
  info: "bg-blue-600",
  error: "bg-negative-500",
  silver: "bg-old-silver",
  "eerie-black": "bg-eerie-black",
  "main-blue": "bg-main-blue",
  "malachite-green": "bg-malachite-green",
  "gradient-blue": "bg-gradient-to-b from-seconday-blue to-light-blue",
  "gradient-red": "bg-gradient-to-b from-red-secondary to-orange-primary",
};

export const SimpleButton = ({
  onClick = () => {},
  bgColor = "main-blue",
  className,
  children,
  disabled = false,
}: ButtonProps) => {
  const classes = cn(
    className,
    backgroundColors[bgColor]
    /* sizes[size],
    fontWeight[weight] */
  );

  return (
    <button
      onClick={() => onClick()}
      className={`border rounded-xl py-2 px-6 cursor-pointer ${
        disabled
          ? "bg-gray-200 border-gray-200 text-gray-400"
          : `${classes} text-white`
      }`}
      disabled={disabled}
    >
      <span className="flex items-center justify-center">{children}</span>
    </button>
  );
};
