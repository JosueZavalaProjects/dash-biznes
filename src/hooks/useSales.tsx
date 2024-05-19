import { useContext } from "react";

import dayjs from "dayjs";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

import { SalesProps } from "@/components/SalesCard";
import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ProductMovement } from "@/types/addProduct";
import { Sale } from "@/types/sales";
import { ProductCheckout } from "@/types/salesPoint";

import { useProduct } from "./useProduct";
import { useSalesPoint } from "./useSalesPoint";

require("dayjs/locale/es");

export const useSales = () => {
  const salesRef = collection(db, "sales");
  const authCtx = useContext(AuthContext);
  const { UpdateInventoryProduct, GetProductInventory } = useSalesPoint();
  const { CreateProductMovementRecord } = useProduct();

  dayjs.locale("es");

  const GetDataSales = async () => {
    const q = query(salesRef, where("adminEmail", "==", authCtx.email));
    const qwerySnapshot = await getDocs(q);

    const response: Sale[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total, paymentMethod, date, ticket } = doc.data();

      const { seconds } = date;
      const newDate = new Date(seconds * 1000);

      response.push({
        id: doc.id,
        ticketNumber: ticket || "N/A",
        date: dayjs(newDate).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
        total,
        method: paymentMethod || "cash",
      });
    });
    return response;
  };

  const GetRecentSales = async (startDate: string, endDate: string) => {
    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);

    const q = query(
      salesRef,
      where("adminEmail", "==", authCtx.email),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );
    const qwerySnapshot = await getDocs(q);

    const response: SalesProps[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total, date, ticket } = doc.data();
      const { seconds } = date;
      const newDate = new Date(seconds * 1000);

      response.push({
        ticketNumber: `Ticket ${ticket}`,
        date: dayjs(newDate).format("DD [de] MMMM YYYY") || "No Date",
        saleAmount: total,
      });
    });
    return response;
  };

  const GetSaleByID = async (id: string) => {
    const docRef = doc(db, "sales", id);
    const querySnapshot = await getDoc(docRef);

    return querySnapshot.data();
  };

  const _returnInventoryProduct = async (saleId: string) => {
    console.log(saleId);
    const response: DocumentData | undefined = await GetSaleByID(saleId);

    const { products } = response || {};

    (products as Array<ProductCheckout>).forEach(async (product) => {
      const { id, amount } = product;

      const inventoryInDB = await GetProductInventory(id);
      await UpdateInventoryProduct(id, inventoryInDB + amount);

      const productMovement: ProductMovement = {
        id,
        amount: -amount,
        type: "editPurchase",
        date: Timestamp.fromDate(new Date()),
        saleId: saleId,
      };
      await CreateProductMovementRecord(productMovement);
    });
  };

  const DeleteSale = async (saleId: string) => {
    await _returnInventoryProduct(saleId);
    const response = await deleteDoc(doc(db, "sales", saleId));

    return response;
  };

  const GetSalesByDate = async (startDate: string, endDate: string) => {
    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);

    const q = query(
      salesRef,
      where("adminEmail", "==", authCtx.email),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );
    const qwerySnapshot = await getDocs(q);

    const response: Sale[] = [];
    qwerySnapshot.forEach((doc) => {
      const { total, paymentMethod, date, ticket } = doc.data();

      const { seconds } = date;
      const newDate = new Date(seconds * 1000);

      response.push({
        id: doc.id,
        ticketNumber: ticket || "N/A",
        date: dayjs(newDate).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
        total,
        method: paymentMethod || "cash",
      });
    });
    return response;
  };

  return {
    GetDataSales,
    GetRecentSales,
    DeleteSale,
    GetSaleByID,
    GetSalesByDate,
  };
};
