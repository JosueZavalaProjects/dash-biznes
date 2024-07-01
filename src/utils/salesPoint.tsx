import { Timestamp } from "firebase/firestore";

import { ProductMovement } from "@/types/addProduct";
import { ProductCheckout } from "@/types/salesPoint";

export const _obtainProductsDeleted = (
  idSale: string,
  updatedProducs: ProductCheckout[],
  initialProducts: ProductCheckout[]
): ProductMovement[] => {
  const deletedProducts: ProductMovement[] = [];

  initialProducts.forEach((product) => {
    const { id, amount } = product;
    const existingProduct = updatedProducs.find((p) => p.id === product.id);

    if (!existingProduct) {
      const productMovement: ProductMovement = {
        id,
        amount: -amount,
        type: "editPurchase",
        date: Timestamp.fromDate(new Date()),
        saleId: idSale,
      };
      deletedProducts.push(productMovement);
    }
  });
  return deletedProducts;
};

export const _obtainProductsAdded = (
  idSale: string,
  updatedProducs: ProductCheckout[],
  initialProducts: ProductCheckout[]
): ProductMovement[] => {
  const addedProducts: ProductMovement[] = [];

  updatedProducs.forEach((product) => {
    const { id, amount } = product;
    const existingProduct = initialProducts.find((p) => p.id === product.id);

    if (!existingProduct) {
      const productMovement: ProductMovement = {
        id,
        amount: amount,
        type: "editPurchase",
        date: Timestamp.fromDate(new Date()),
        saleId: idSale,
      };
      addedProducts.push(productMovement);
    }
  });

  return addedProducts;
};

export const _obtainProductsModified = (
  idSale: string,
  updatedProducs: ProductCheckout[],
  initialProducts: ProductCheckout[]
): ProductMovement[] => {
  const modifiedProducts: ProductMovement[] = [];

  updatedProducs.forEach(async (product) => {
    const { id, amount } = product;
    let amountCalculated = 0;

    const productMatch = initialProducts?.find((product) => product.id === id);

    if (productMatch) amountCalculated = amount - productMatch.amount;

    if (amountCalculated !== 0) {
      const productMovement: ProductMovement = {
        id,
        amount: amountCalculated,
        type: "editPurchase",
        date: Timestamp.fromDate(new Date()),
        saleId: idSale,
      };
      modifiedProducts.push(productMovement);
    }
  });

  return modifiedProducts;
};
