import { useContext } from "react";

import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { MovementType } from "@/types/addProduct";
import { GraphResult } from "@/types/dashboard";

export const useProductMovements = () => {
  // add: Manual Adition (Edit Product)
  // new: Adition new product by "add product module"
  const filterAdd: MovementType = "add";
  const filterNew: MovementType = "new";

  const movementsRef = collection(db, "product_movements");
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

  return {
    GetAllAdditionMovements,
    GetProductsAdditionsByDate,
  };
};
