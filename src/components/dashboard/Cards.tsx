"use client";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { CARD_DATA_KEYS, DUMMY_SPENTS, cardData } from "@/constants/dashboard";
import { db } from "@/services/firebase";
import { formatCurrency } from "@/utils/common";

import Card, { CardProps } from "../Card";

export const Cards = () => {
  /* const [inventoryCount, setInventoryCount] = useState<number>(0);
   */
  const [inventorySpent, setInventorySpent] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);

  const [cards, setCards] = useState<CardProps[]>(cardData);

  const handleSetCards = (
    key: string,
    amount: number,
    description?: string
  ) => {
    const newCards = [...cards];
    const newCardElement = newCards.find((element) => element.label === key);
    if (newCardElement) {
      newCardElement.amount = formatCurrency(amount);
      newCardElement.description = description || newCardElement.description;
    }
    setCards(newCards);
  };

  const handleGetProducts = async () => {
    const newProducts = await getDataProducts();
    const inventoryAmount = newProducts.reduce((a, b) => a + b);
    const inventoryLength = newProducts.length;

    /* setInventoryCount(inventoryLength);
     */
    setInventorySpent(inventoryAmount);
    handleSetCards(
      CARD_DATA_KEYS.INVENTORY,
      inventoryAmount,
      `+${inventoryLength} productos totales`
    );
  };

  const handleGetSales = async () => {
    const newSales = await getDataSales();
    const salesAmount = newSales.reduce((a, b) => a + b);
    setTotalSales(salesAmount);

    handleSetCards(CARD_DATA_KEYS.SALES, salesAmount);
  };

  const handleCalculateUtilities = () => {
    const spents = inventorySpent + DUMMY_SPENTS;
    const utilities = totalSales - spents;
    handleSetCards(CARD_DATA_KEYS.UTILITIES, utilities);
  };

  const handleCalculateSpents = () => {
    const spents = inventorySpent + DUMMY_SPENTS;
    handleSetCards(CARD_DATA_KEYS.SPENTS, spents);
  };

  const getDataProducts = async () => {
    const qwerySnapshot = await getDocs(collection(db, "products"));

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { price } = doc.data();

      //TODO: Replace price * 0.8 by purchaseCost
      response.push(price * 0.8);
    });
    return response;
  };

  const getDataSales = async () => {
    const qwerySnapshot = await getDocs(collection(db, "sales"));

    const response: number[] = [];

    qwerySnapshot.forEach((doc) => {
      const { total } = doc.data();
      response.push(total);
    });
    return response;
  };

  useEffect(() => {
    handleGetProducts();
    handleGetSales();
  }, []);

  useEffect(() => {
    handleCalculateSpents();
  }, [inventorySpent]);

  useEffect(() => {
    handleCalculateUtilities();
  }, [inventorySpent, totalSales]);

  return (
    <>
      {cardData.map((d, i) => (
        <Card
          key={i}
          amount={d.amount}
          description={d.description}
          icon={d.icon}
          label={d.label}
        />
      ))}
    </>
  );
};
