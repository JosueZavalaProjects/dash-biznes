"use client";
import { useContext, useEffect, useState } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { MobileNavbar } from "@/components/SideNav/MobileNavbar";
import SideNavbar from "@/components/SideNav/SideNavbar";
import AuthContext, { AuthContextProvider } from "@/context/AuthContext";

import { cn } from "../lib/utils";
import LoginPage from "./(non-auth)/login/page";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "Buzines",
  description: "Application for enterprises",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogued, setIsLogued] = useState(false);
  const authCtx = useContext(AuthContext);
  
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen w-full bg-white text-black flex ", {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <AuthContextProvider>
          {getCookie("token") && (
            <>
              <div id="portal" />
              <SideNavbar />
              <MobileNavbar />
              <div className="p-8 w-full">{children}</div>
            </>
          )}
          {!getCookie("token") && (
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
