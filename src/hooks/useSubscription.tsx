import { useContext } from "react";

import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { initFirebase } from "@/services/firebase";
import { getPortalUrl } from "@/services/stripePayments";
import { CancelPeriod } from "@/types/stripePayments";

export const useSubscription = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const app = initFirebase();

  const ValidateSubscription = async (cancelPeriod: CancelPeriod) => {
    const { cancelAtPeriodEnd, cancelAt } = cancelPeriod;
    if (!cancelAtPeriodEnd) router.refresh();
    if (cancelAt && !isSubcriptionExpired(cancelAt)) router.refresh();

    if (cancelAt && isSubcriptionExpired(cancelAt)) {
      const portalUrl = await getPortalUrl(app);
      router.push(portalUrl);
      authCtx.logout();
    }
  };

  const isSubcriptionExpired = (cancelAt: Timestamp): boolean => {
    let isExpired = false;
    const { seconds } = cancelAt;
    const cancelAtDate = new Date(seconds * 1000);

    isExpired = new Date(cancelAtDate) < new Date();
    return isExpired;
  };

  return {
    ValidateSubscription,
  };
};
