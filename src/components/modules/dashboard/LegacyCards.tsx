"use client";
import { useEffect, useState } from "react";

import { CARD_DATA_KEYS, cardData } from "@/constants/dashboard";
import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency } from "@/utils/common";

import Card, { CardProps } from "../../LegacyCard";

export const Cards = () => {
  const [inventorySpent, setInventorySpent] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const [cards, setCards] = useState<CardProps[]>(cardData);
  const { GetTotalSales, GetDataProducts, GetTotalExpenses } = useDashboard();

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
    const newProducts = await GetDataProducts();
    const inventoryAmount = newProducts?.length
      ? newProducts.reduce((a, b) => a + b)
      : 0;

    const inventoryLength = newProducts.length;

    setInventorySpent(inventoryAmount);
    handleSetCards(
      CARD_DATA_KEYS.INVENTORY,
      inventoryAmount,
      `+${inventoryLength} productos totales`
    );
  };

  const handleGetSales = async () => {
    const newSales = await GetTotalSales();
    const salesAmount = newSales?.length ? newSales.reduce((a, b) => a + b) : 0;
    setTotalSales(salesAmount);

    handleSetCards(CARD_DATA_KEYS.SALES, salesAmount);
  };

  const handleCalculateUtilities = () => {
    const spents = inventorySpent + totalExpenses;
    const utilities = totalSales - spents;
    handleSetCards(CARD_DATA_KEYS.UTILITIES, utilities);
  };

  const handleCalculateSpents = async () => {
    const responseExpenses = await GetTotalExpenses();
    const newExpenses = responseExpenses?.length
      ? responseExpenses.reduce((a, b) => a + b)
      : 0;

    setTotalExpenses(newExpenses);
    handleSetCards(CARD_DATA_KEYS.SPENTS, newExpenses);
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
          key={`legacyCard_${i}`}
          amount={d.amount}
          description={d.description}
          icon={d.icon}
          label={d.label}
          link={d.link}
        />
      ))}
    </>
  );
};
