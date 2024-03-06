"use client";

import React from "react";

import cn from "classnames";

import { As, Color, FontWeight, Size } from "@/types/UI/common";

export interface TextProps {
  children: React.ReactNode;
  as?: As;
  className?: string;
  color?: Color;
  weight?: FontWeight;
  size?: Size;
}

export const colors = {
  white: "text-white",
  gray: "text-gray-400",
  dark: "text-gray-800",
  primary: "text-primary",
  cta: "text-cta-600",
  positive: "text-positive-600",
  negative: "text-negative-600",
  caution: "text-caution-600",
  info: "text-blue-600",
  error: "text-negative-500",
  silver: "text-old-silver",
  "eerie-black": "text-eerie-black",
};

export const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

export const fontWeight = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Text = React.forwardRef(function TextWithRef(
  {
    as = "span",
    className = "",
    color = "gray",
    weight = "normal",
    size = "base",
    children,
  }: TextProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const classes = cn(className, colors[color], sizes[size], fontWeight[weight]);

  return (
    <>
      {React.createElement(
        as,
        {
          ref,
          className: classes,
        },
        children
      )}
    </>
  );
});

export default Text;
