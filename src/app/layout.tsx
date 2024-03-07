/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import SideNavbar from "@/components/SideNav/SideNavbar";

import { cn } from "../lib/utils";
import { MobileNavbar } from "@/components/SideNav/MobileNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buzines",
  description: "Application for enterprises",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        {/* sidebar */}
        {/* <p className="border">Sidebar</p> */}
        <div id="portal" />
        <SideNavbar />
        <MobileNavbar />
        {/* main page */}
        <div className="p-8 w-full">{children}</div>
      </body>
    </html>
  );
}
