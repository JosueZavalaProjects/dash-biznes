import { useState } from "react";

import { Unit } from "@/types/addProduct";

export const useAmount = (unit: Unit) => {
  const [amount, setAmount] = useState<string>("");

  const _removeCharacter = () => {
    const newAmount = amount.split("", amount.length - 1).join("");

    setAmount(newAmount !== "0" ? newAmount : "");
  };

  const _decimalPoint = () => {
    const newAmount = amount.split(".");

    if (unit === "pzs") return false;

    if (!newAmount[0]) {
      setAmount("0.");
      return false;
    }
    if (newAmount.length > 1) return false;

    return true;
  };

  const _checkDecimalPart = () => {
    const newAmount = amount.split(".");
    if (newAmount.length > 1 && newAmount[1].length > 2) return false;

    return true;
  };

  const handleSetAmount = (character: number | string) => {
    if (character === "<") {
      _removeCharacter();
      return;
    }
    if (character === ".") {
      const isValidPoint = _decimalPoint();
      if (!isValidPoint) return;
    }
    if (!_checkDecimalPart()) return;

    const newAmount = amount + `${character}`;
    setAmount(newAmount !== "0" ? newAmount : "");
  };

  const removeDecimalPart = (unit: Unit) => {
    if (unit === "pzs") {
      const decimalPart = amount.split(".");
      setAmount(decimalPart[0]);
    }
  };

  return { amount, handleSetAmount, removeDecimalPart };
};
