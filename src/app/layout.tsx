"use client";
import { useContext, useEffect, useState } from "react";

import { deleteCookie, getCookie } from "cookies-next";
import { usePathname } from "next/navigation";

import "./globals.css";
import { Loading } from "@/components/modals/components/Loading";
import { MobileNavbar } from "@/components/SideNavLegacy/MobileNavbar";
import SideNavbar from "@/components/SideNavLegacy/SideNavbar";
import AuthContext, { AuthContextProvider } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { initFirebase } from "@/services/firebase";
import { getCancelPeriodEnd } from "@/services/stripePayments";

import { cn } from "../lib/utils";
import LoginPage from "./(non-auth)/login/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogued, setIsLogued] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const app = initFirebase();
  const pathname = usePathname();
  const { IsValidSubscription } = useSubscription();

  const getCookiesLogin = () => {
    return {
      email: getCookie("email"),
      localId: getCookie("token"),
      expirationTime: getCookie("expirationTime"),
    };
  };

  const isPremiumUser = async () => {
    const { email, localId, expirationTime } = getCookiesLogin();

    try {
      authCtx.login(email, localId, expirationTime);
      const response = await getCancelPeriodEnd(app);

      if (!IsValidSubscription(response)) authCtx.logout();
    } catch {
      deleteCookie("token");
      deleteCookie("expirationTime");
      deleteCookie("email");
      deleteCookie("products");
      deleteCookie("saleID");

      console.log("Catched");
      return;
    }
  };

  useEffect(() => {
    if (!authCtx) return;

    isPremiumUser();

    setIsLogued(authCtx.isLoggedIn);
    setIsLoading(false);
  }, [authCtx]);

  useEffect(() => {
    // La cookie "products" solo de persistir en salesPoint
    if (pathname !== "/salesPoint") {
      deleteCookie("products");
      deleteCookie("saleID");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={cn("min-h-screen w-full bg-white text-black flex ", {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <AuthContextProvider>
          {isLoading && (
            <section className="flex items-center justify-center w-full">
              <Loading />
            </section>
          )}
          {!isLoading && getCookie("token") && (
            <>
              <div id="portal" />
              <SideNavbar />
              <MobileNavbar />
              <div className="p-8 w-full mb-[5rem] sm:mb-0">{children}</div>
            </>
          )}
          {!isLoading && !getCookie("token") && (
            <>
              {isLogued}
              <LoginPage />
            </>
          )}
        </AuthContextProvider>
      </body>
    </html>
  );
}
