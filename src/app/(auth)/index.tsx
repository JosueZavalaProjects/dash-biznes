import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { useSubscription } from "@/hooks/useSubscription";
import { MobileNavbar } from "@/components/SideNavLegacy/MobileNavbar";
import SideNavbar from "@/components/SideNavLegacy/SideNavbar";
import AuthContext from "@/context/AuthContext";

import { initFirebase } from "@/services/firebase";
import { getCancelPeriodEnd } from "@/services/stripePayments";

export const LogguedPortal = ({ children }: { children: React.ReactNode }) => {
  const authCtx = useContext(AuthContext);
  const [isValid, setIsvalid] = useState(false);
  const { IsValidSubscription } = useSubscription();
  const router = useRouter();
  const app = initFirebase();

  const getCookiesLogin = () => {
    return {
      email: getCookie("email"),
      localId: getCookie("token"),
      expirationTime: getCookie("expirationTime"),
      isPremium: getCookie("isPremium"),
    };
  };

  const isPremiumUser = async () => {
    const { email } = getCookiesLogin();

    try {
      if (email) {
        const response = await getCancelPeriodEnd(app);

        if (!IsValidSubscription(response)) {
          setIsvalid(false);
          authCtx.logout();
          router.refresh();
          return;
        }
        setIsvalid(true);
      }
    } catch {
      console.log("Catched");
      return;
    }
  };

  useEffect(() => {
    if (!authCtx) return;

    isPremiumUser();
  }, [authCtx]);
  return (
    <>
      {isValid && (
        <>
          <div id="portal" />
          <SideNavbar />
          <MobileNavbar />
          <div className="p-8 w-full mb-[5rem] sm:mb-0">{children}</div>
        </>
      )}
    </>
  );
};
