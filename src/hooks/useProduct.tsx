import { useContext } from "react";

import dayjs from "dayjs";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
    const querySnapshot = await getDocs(q);

    const response: InventoryProduct[] = [];

    querySnapshot.forEach((doc) => {
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

  const DeleteProduct = async (productId: string) => {
    const response = await deleteDoc(doc(db, "products", productId));

    return response;
  };

  const GetProductByID = async (id: string) => {
    const docRef = doc(db, "products", id);
    const querySnapshot = await getDoc(docRef);

    return querySnapshot.data();
  };

  return { CreateProduct, GetDataProducts, DeleteProduct, GetProductByID };
};
