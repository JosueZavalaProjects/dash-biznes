import { Timestamp } from "firebase/firestore";

/**
 * Format number to $XX,XXX.XX
 */
export function formatCurrency(
  number: number,
  maximumFractionDigits = 2
): string {
  if (!number && number !== 0) return "";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    style: "currency",
    currency: "USD",
  }).format(number);
}

export const getDatefromTimestamp = (timeStamp?: Timestamp): Date | string => {
  if (!timeStamp) return "";

  const { seconds } = timeStamp;
  const newDate = new Date(seconds * 1000);

  return newDate;
};
