export type As =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "caption"
  | "span";

export type Color =
  | "white"
  | "gray"
  | "dark"
  | "primary"
  | "cta"
  | "positive"
  | "negative"
  | "caution"
  | "error"
  | "info"
  | "silver"
  | "eerie-black";

export type BgColor = Color | "main-blue" | "malachite-green";

export type Size =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type FontWeight = "normal" | "medium" | "semibold" | "bold";

export type NavOptions = {
  label: string;
  name: string;
};

export type TabContent = {
  [x: string]: JSX.Element;
};

export type PaymentStep = 1 | 2 | 3 | 4;
export type PaymentMethod = "cash" | "credit" | "debit" | "transfer";
