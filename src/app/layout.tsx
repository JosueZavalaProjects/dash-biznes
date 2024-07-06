"use client";
import { useContext, useEffect, useState } from "react";

import { deleteCookie, getCookie } from "cookies-next";
import { usePathname } from "next/navigation";

import "./globals.css";
import { Loading } from "@/components/modals/components/Loading";
import AuthContext, { AuthContextProvider } from "@/context/AuthContext";

import { cn } from "../lib/utils";
import { LogguedPortal } from "./(auth)";
import LoginPage from "./(non-auth)/login/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogued, setIsLogued] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const pathname = usePathname();

  useEffect(() => {
    if (!authCtx) return;

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
              <LogguedPortal>{children}</LogguedPortal>
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
