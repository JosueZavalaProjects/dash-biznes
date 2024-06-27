"use client";

import { create, useStore } from "zustand";

import { CONTENTS, SALES_POINT_NAV, TAB_KEYS } from "@/constants/salesPoint";
import { ProductCheckout } from "@/types/salesPoint";
import {
  NavOptions,
  PaymentMethod,
  PaymentStep,
  TabContent,
} from "@/types/UI/common";

type InitialState = {
  tabName: string;
  menuNav: NavOptions[];
  payment: number;
  products: ProductCheckout[];
  tabsContents: TabContent;
  paymentStep: PaymentStep;
  paymentMethod: PaymentMethod;
  total: number;
  categories?: string[];
  categorySelectedIndex: number;
};

type SalesPointStateProps = InitialState & {
  setTabName: (tabName: string) => void;
  setPaymentStep: (paymentStep: PaymentStep) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setPayment: (paymentMethod: number) => void;
  setCategories: (categories: string[]) => void;
  setCategorySelectedIndex: (categorySelectedIndex: number) => void;
  updateProduct: (product: ProductCheckout) => void;
  removeProduct: (product: ProductCheckout) => void;
  clearSale: () => void;
};

const handleUpdateProduct = (
  item: ProductCheckout,
  state: SalesPointStateProps
): ProductCheckout[] => {
  const { products } = state;

  const currentItem = products.find((element) => element?.name === item?.name);

  if (currentItem) {
    currentItem.amount = item.amount;
    return [...products];
  }

  return [...products, item];
};

const handleRemoveProduct = (
  item: ProductCheckout,
  state: SalesPointStateProps
): ProductCheckout[] => {
  const { products } = state;

  const newProducts = products.filter((element) => element?.id !== item?.id);

  return newProducts;
};

const calculateItemTotal = (item: ProductCheckout) => item.price * item.amount;

const handleCalculateTotal = (items: ProductCheckout[]) => {
  return items
    .map(calculateItemTotal)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const INITIAL_STATE: InitialState = {
  tabName: TAB_KEYS.ORDER,
  menuNav: SALES_POINT_NAV,
  tabsContents: CONTENTS,
  products: [],
  payment: 0,
  paymentMethod: "",
  paymentStep: 1,
  total: 0,
  categorySelectedIndex: -1,
};

const SalesPointStore = create<SalesPointStateProps>((set) => ({
  tabName: TAB_KEYS.ORDER,
  menuNav: SALES_POINT_NAV,
  tabsContents: CONTENTS,
  paymentStep: 1,
  payment: 0,
  paymentMethod: "",
  products: [],
  categories: [],
  total: 0,
  categorySelectedIndex: -1,
  setTabName: (tabName: string) => set({ tabName }),
  setPaymentStep: (paymentStep: PaymentStep) => set({ paymentStep }),
  setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod }),
  setPayment: (payment: number) => set({ payment }),
  setCategories: (categories: string[]) => set({ categories }),
  setCategorySelectedIndex: (categorySelectedIndex: number) =>
    set({ categorySelectedIndex }),
  updateProduct: (item: ProductCheckout) => {
    set((state: SalesPointStateProps) => {
      const products = handleUpdateProduct(item, state);
      const total = handleCalculateTotal(products);

      return { products, total };
    });
  },
  removeProduct: (item: ProductCheckout) => {
    set((state: SalesPointStateProps) => {
      const products = handleRemoveProduct(item, state);
      const total = handleCalculateTotal(products);

      return { products, total };
    });
  },
  setProducts: (products: ProductCheckout[]) => set({ products }), // Create setProducts
  clearSale: () => {
    set(() => {
      return INITIAL_STATE;
    });
  },
}));

const useSalesPointState = () => useStore(SalesPointStore);

export default useSalesPointState;
