import { Timestamp } from "firebase/firestore";

import { CancelPeriod } from "@/types/stripePayments";

export const useSubscription = () => {
  const IsValidSubscription = (cancelPeriod: CancelPeriod): boolean => {
    const { cancelAtPeriodEnd, cancelAt, status } = cancelPeriod;
    if (!cancelAtPeriodEnd && status === "active") return true;
    if (cancelAt && !isSubcriptionExpired(cancelAt)) return true;

    /* if (cancelAt && isSubcriptionExpired(cancelAt))  */
    return false;
  };

  const isSubcriptionExpired = (cancelAt: Timestamp): boolean => {
    let isExpired = false;
    const { seconds } = cancelAt;
    const cancelAtDate = new Date(seconds * 1000);

    isExpired = new Date(cancelAtDate) < new Date();
    return isExpired;
  };

  return {
    IsValidSubscription,
  };
};
