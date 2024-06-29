import { useContext } from "react";

import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { MovementType } from "@/types/addProduct";
import { BestSales, GraphResult, PurchasesMovements } from "@/types/dashboard";

import { useProduct } from "./useProduct";

export const useProductMovements = () => {
  // add: Manual Adition (Edit Product)
  // new: Adition new product by "add product module"
  const filterAdd: MovementType = "add";
  const filterNew: MovementType = "new";
  const filterPurchase: MovementType = "purchase";
  const filterEditPurchase: MovementType = "editPurchase";

  const movementsRef = collection(db, "product_movements");
  const { GetProductByID } = useProduct();
  const authCtx = useContext(AuthContext);

  const GetAllAdditionMovements = async () => {
    const q = query(
      movementsRef,
      where("adminEmail", "==", authCtx.email),
      where("type", "in", [filterAdd, filterNew])
    );

    const qwerySnapshot = await getDocs(q);

    const response: number[] = [];

    qwerySnapshot.forEach(async (doc) => {
      const { amount, purchasePrice } = doc.data();
      response.push(amount * purchasePrice);
    });

    return response;
  };

  const GetProductsAdditionsByDate = async (
    startDate: string,
    endDate: string
  ) => {
    const startOfDay = new Date(startDate);
    const endOfDay = new Date(endDate);

    const q = query(
      movementsRef,
      where("type", "in", [filterAdd, filterNew]),
      where("adminEmail", "==", authCtx.email),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay)
    );
    const qwerySnapshot = await getDocs(q);

    const response: GraphResult[] = [];

    qwerySnapshot.forEach((doc) => {
      const { amount, purchasePrice, date } = doc.data();

      const { seconds } = date;
      const newDate = new Date(seconds * 1000);
      const _date = dayjs(newDate).format("YYYY-MM-DD");

      response.push({
        date: _date || "No Date",
        total: amount * purchasePrice,
      });
    });

    return response;
  };

  const GetPurchaseSales = async () => {
    const q = query(
      movementsRef,
      where("adminEmail", "==", authCtx.email),
      where("type", "in", [filterPurchase, filterEditPurchase])
    );

    const qwerySnapshot = await getDocs(q);

    /* const response: BestSales[] = []; */
    const purchaseObject: PurchasesMovements = {};

    qwerySnapshot.forEach(async (doc) => {
      const { id, amount } = doc.data();

      const productDetails = await GetProductByID(id);
      _generatePurchasesObject(purchaseObject, id, amount, productDetails);

      /* console.log(doc.data());
      console.log(productDetails); */
      /* response.push(amount * purchasePrice); */
    });
    console.log({ purchaseObject });

    return purchaseObject;
  };

  const _generatePurchasesObject = (
    responseObject: PurchasesMovements,
    id: string,
    purchaseMovementAmount: number,
    productDetails: any
  ) => {
    if (responseObject[id]) {
      responseObject[id].purchases =
        responseObject[id].purchases + purchaseMovementAmount;
      return;
    }
    responseObject[id] = {
      purchases: purchaseMovementAmount,
      details: productDetails,
      id,
    };
  };

  return {
    GetAllAdditionMovements,
    GetProductsAdditionsByDate,
    GetPurchaseSales,
  };
};
