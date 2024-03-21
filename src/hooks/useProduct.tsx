import { useContext } from "react";

import { addDoc, collection } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { Product } from "@/types/addProduct";

export const useProduct = () => {
  const productsRef = collection(db, "products");
  const authCtx = useContext(AuthContext);

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

  return { CreateProduct };
};
