import { useContext } from "react";

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { DocumentData, DocumentReference } from "firebase/firestore";

import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ProductMovement } from "@/types/addProduct";
import { ProductCheckout, Product as ProductType } from "@/types/salesPoint";
import {
  _obtainProductsAdded,
  _obtainProductsDeleted,
  _obtainProductsModified,
} from "@/utils/salesPoint";

import { useProduct } from "./useProduct";

export const useSalesPoint = () => {
  const { paymentMethod, products, total } = useSalesPointState();
  const { CreateProductMovementRecord, GetProductByID } = useProduct();
  const authCtx = useContext(AuthContext);

  const salesRef = collection(db, "sales");
  const productssRef = collection(db, "products");

  const _handleAddSaleToDB = async (
    ticketNumber: number,
    PaymentAmount?: number
  ) => {
    let newObj = {
      products,
      payment: PaymentAmount || total,
      total,
      paymentMethod,
      ticket: ticketNumber + 1,
      date: Timestamp.fromDate(new Date()),
      adminEmail: authCtx.email,
    };

    const saleResponse: DocumentReference<DocumentData, DocumentData> =
      await addDoc(salesRef, newObj);

    const { id } = saleResponse;
    await _createProductsMovements(products, id);
    return saleResponse;
  };

  const _createProductsMovements = async (
    products: ProductCheckout[],
    saleId: string
  ) => {
    products.forEach(async (product) => {
      const { id, amount } = product;
      const productMovement: ProductMovement = {
        id,
        amount,
        type: "purchase",
        date: Timestamp.fromDate(new Date()),
        saleId: saleId,
      };
      await CreateProductMovementRecord(productMovement);
    });
  };

  const _handleGetTicketLasSale = async () => {
    let ticketNumber = 0;
    const q = query(salesRef, orderBy("ticket", "desc"), limit(1));

    const qwerySnapshot = await getDocs(q);

    qwerySnapshot.forEach((doc) => {
      ticketNumber = doc.data().ticket;
    });
    return ticketNumber;
  };

  const _updateProduct = async () => {
    products.forEach(async (product) => {
      const { id, amount, inventory } = product;
      const newObj = {
        inventory: inventory - amount,
      };
      const docRef = doc(db, "products", id);
      return await updateDoc(docRef, newObj);
    });
  };

  const _handleUpdateProductMovement = async (
    idSale: string,
    updatedProducs: ProductCheckout[],
    initialProducts: ProductCheckout[]
  ) => {
    const productsModified = _obtainProductsModified(
      idSale,
      updatedProducs,
      initialProducts
    );
    const productsDeleted = _obtainProductsDeleted(
      idSale,
      updatedProducs,
      initialProducts
    );
    const productsAdded = _obtainProductsAdded(
      idSale,
      updatedProducs,
      initialProducts
    );

    productsModified.forEach(async (product) => {
      // Update Inventory
      const inventoryInDB = await _handleGetProductInventory(product.id);
      // if amount is -2 inventory of product must increase 2
      // if amount is 2 inventory of product must decrease 2

      const amountCalculated = product.amount * -1;
      await _updateInventoryProduct(
        product.id,
        inventoryInDB + amountCalculated
      );
      await CreateProductMovementRecord(product);
    });

    productsDeleted.forEach(async (product) => {
      // Update Inventory
      const inventoryInDB = await _handleGetProductInventory(product.id);
      const amountCalculated = inventoryInDB - product.amount;
      await _updateInventoryProduct(product.id, amountCalculated);
      await CreateProductMovementRecord(product);
    });

    productsAdded.forEach(async (product) => {
      // Update Inventory
      const inventoryInDB = await _handleGetProductInventory(product.id);
      const amountCalculated = inventoryInDB - product.amount;
      await _updateInventoryProduct(product.id, amountCalculated);
      await CreateProductMovementRecord(product);
    });
  };

  const _handleGetProductInventory = async (idProduct: string) => {
    const product: DocumentData | undefined = await GetProductByID(idProduct);
    const { inventory } = product || {};
    return inventory;
  };

  const _updateInventoryProduct = async (id: string, amount: number) => {
    const docRef = doc(db, "products", id);

    const newProduct = {
      inventory: amount,
      updatedDate: Timestamp.fromDate(new Date()),
    };

    return await updateDoc(docRef, newProduct);
  };

  const CreateSale = async (PaymentAmount?: number) => {
    const ticketNumber = await _handleGetTicketLasSale();
    await _handleAddSaleToDB(ticketNumber, PaymentAmount);
    return await _updateProduct();
  };

  const GetDataProducts = async () => {
    const q = query(
      productssRef,
      where("adminEmail", "==", authCtx.email),
      where("isDeleted", "!=", true)
    );
    const qwerySnapshot = await getDocs(q);

    const response: ProductType[] = [];
    qwerySnapshot.forEach((doc) => {
      const { category, subcategory, inventory, name, price } = doc.data();
      response.push({
        id: doc.id,
        name,
        price,
        category,
        inventory,
        subcategory,
      });
    });

    return response;
  };

  const UpdateSale = async (
    id: string,
    initialEditProducts: ProductCheckout[]
  ) => {
    let newObj = {
      products,
      payment: total,
      total,
      paymentMethod,
      date: Timestamp.fromDate(new Date()),
      adminEmail: authCtx.email,
    };

    const docRef = doc(db, "sales", id);

    await _handleUpdateProductMovement(id, products, initialEditProducts);
    return await updateDoc(docRef, newObj);
  };

  return {
    CreateSale,
    GetDataProducts,
    UpdateSale,
    UpdateInventoryProduct: _updateInventoryProduct,
    GetProductInventory: _handleGetProductInventory,
  };
};
