import { useContext } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { MovementType } from "@/types/addProduct";
import { useProduct } from "./useProduct";

export const useProductMovements = () => {
  const movementsRef = collection(db, "product_movements");
  const { GetProductByID } = useProduct();

  const authCtx = useContext(AuthContext);

  const GetAllAditionMovements = async () => {
    // add: Manual Adition (Edit Product)
    // new: Adition new product by "add product module"
    const filterAdd: MovementType = "add";
    const filterNew: MovementType = "new";

    const q = query(
      movementsRef,
      where("adminEmail", "==", authCtx.email),
      where("type", "in", [filterAdd, filterNew])
    );

    const qwerySnapshot = await getDocs(q);

    const response: number[] = [];

    qwerySnapshot.forEach(async (doc) => {
      const { total, id } = doc.data();
      response.push(total);

      console.log(doc.data());
      const productDetails = await GetProductByID(id);
      console.log({ productDetails });
    });
    return response;
  };

  return {
    GetAllAditionMovements,
    /* GetDataProducts,
    GetTotalExpenses,
    GetSalesByDate,
    GetExpensesByDate,
    GetProductsByDate, */
  };
};
