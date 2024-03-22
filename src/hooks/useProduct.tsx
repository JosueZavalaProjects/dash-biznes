import { useContext } from "react";

import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { Product } from "@/types/addProduct";
import { Product as InventoryProduct } from "@/types/inventory";

export const useProduct = () => {
  const productsRef = collection(db, "products");
  const authCtx: any = useContext(AuthContext);

  const CreateProduct = async (product: Product) => {
    const { name, category, price, amount, type, unit, purchasePrice } =
      product;
    return await addDoc(productsRef, {
      name,
      category,
      price,
      purchasePrice,
      subcategory: type,
      unit,
      inventory: amount,
      date: new Date().toString(),
      adminEmail: authCtx.email,
    });
  };

  const GetDataProducts = async () => {
    const q = query(
      productsRef,
      where("adminEmail", "==", authCtx.email),
      orderBy("date", "desc")
    );
    const qwerySnapshot = await getDocs(q);

    const response: InventoryProduct[] = [];

    qwerySnapshot.forEach((doc) => {
      const { name, category, subcategory, price, inventory, date } =
        doc.data();

      response.push({
        id: doc.id,
        name,
        category,
        subcategory,
        price,
        inventory,
        dateAdded:
          dayjs(date).format("DD [de] MMMM YYYY HH:mm:ss") || "No Date",
      });
    });
    return response;
  };

  const DeleteProduct = async () => {
    /* const productsRef = db.collection("products"); */
    const response = await deleteDoc(
      doc(db, "products", "tHL0H1Phck72RY5FcwHo")
    );
    return response;
  };

  return { CreateProduct, GetDataProducts, DeleteProduct };
};
