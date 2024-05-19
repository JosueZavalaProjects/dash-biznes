import { useContext } from "react";

import dayjs from "dayjs";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { DocumentData, DocumentReference } from "firebase/firestore";

import AuthContext from "@/context/AuthContext";
import { db } from "@/services/firebase";
import {
  MovementType,
  Product,
  ProductMovement,
  ProductMovementAdminID,
} from "@/types/addProduct";
import { Product as InventoryProduct } from "@/types/inventory";

export const useProduct = () => {
  const productsRef = collection(db, "products");
  const movementsRef = collection(db, "product_movements");
  const authCtx: any = useContext(AuthContext);

  const CreateProduct = async (product: Product) => {
    const { name, category, price, amount, type, unit, purchasePrice } =
      product;

    const productResponse: DocumentReference<DocumentData, DocumentData> =
      await addDoc(productsRef, {
        name,
        category,
        price,
        purchasePrice,
        subcategory: type,
        unit,
        inventory: amount,
        purchaseAmount: amount,
        date: Timestamp.fromDate(new Date()),
        adminEmail: authCtx.email,
      });

    const { id } = productResponse;

    const movement: ProductMovement = {
      id,
      amount,
      type: "new",
      date: Timestamp.fromDate(new Date()),
    };

    await _createProductMovementRecord(movement);
    return productResponse;
  };

  const _createProductMovementRecord = async (
    purchaseMovment: ProductMovement
  ) => {
    const purchaseMovementId: ProductMovementAdminID = {
      ...purchaseMovment,
      adminEmail: authCtx.email,
    };
    await addDoc(movementsRef, purchaseMovementId);
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
      const { seconds } = date;
      const newDate = new Date(seconds * 1000);
      const _date = dayjs(newDate).format("DD/MM/YYYY");

      response.push({
        id: doc.id,
        name,
        category,
        subcategory,
        price,
        inventory,
        dateAdded: _date || "No Date",
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

  const _handleMovementUpdateProduct = async (
    id: string,
    newAmount: number,
    prevAmount: number
  ) => {
    let type: MovementType = "add";
    const calculatedAmount = newAmount - prevAmount;

    if (prevAmount === newAmount) return;

    if (prevAmount > newAmount) type = "reduce";
    if (prevAmount < newAmount) type = "add";

    const productMovement: ProductMovement = {
      id,
      amount: calculatedAmount,
      type,
      date: Timestamp.fromDate(new Date()),
    };

    return await _createProductMovementRecord(productMovement);
  };

  const UpdateProduct = async (
    id: string,
    product: Product,
    initialInventory: number
  ) => {
    const docRef = doc(db, "products", id);
    const { name, category, price, type, purchasePrice, amount } = product;

    const newProduct = {
      name,
      category,
      price,
      purchasePrice,
      inventory: amount,
      subcategory: type,
      updatedDate: Timestamp.fromDate(new Date()),
    };

    await _handleMovementUpdateProduct(id, amount, initialInventory);
    return await updateDoc(docRef, newProduct);
  };

  return {
    CreateProduct,
    GetDataProducts,
    DeleteProduct,
    GetProductByID,
    UpdateProduct,
    CreateProductMovementRecord: _createProductMovementRecord,
  };
};
