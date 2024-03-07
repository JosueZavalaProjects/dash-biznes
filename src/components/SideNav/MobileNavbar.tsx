"use client";
import { useState } from "react";

import {
  GanttChartSquare,
  LayoutDashboard,
  LucideIcon,
  PlusCircle,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useWindowWidth } from "@react-hook/window-size";

import { AddModal } from "../modals/AddModal";
import { buttonVariants } from "../ui/button";

type FooterIcons = {
  icon: LucideIcon;
  alt: string;
  link?: string;
  modal?: boolean;
};

const FOOTER_ICONS: FooterIcons[] = [
  { icon: LayoutDashboard, alt: "Dashboard", link: "/" },
  { icon: UsersRound, alt: "Inventory", link: "/inventory" },
  { icon: GanttChartSquare, alt: "Activities", link: "/activities" },
  { icon: PlusCircle, alt: "Agregar", modal: true },
];

export const MobileNavbar = () => {
  const pathName = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  return (
    <>
      <AddModal show={showModal} setShow={setShowModal} />
      {mobileWidth && (
        <div className="fixed bottom-4 left-[30%] bg-white mx-auto p-4 rounded-lg z-10">
          <div className="grid grid-cols-4 gap-4 justify-items-center p-1 w-full">
            {FOOTER_ICONS.map((element, index) => {
              if (element.modal) {
                return (
                  <div
                    className={cn(
                      "grid justify-items-center cursor-pointer items-center w-[40px] h-[40px]",
                      buttonVariants({
                        variant:
                          element.link === pathName ? "default" : "ghost",
                        size: "icon",
                      })
                    )}
                    key={`footerlink_${index}`}
                    onClick={() =>
                      element.modal ? setShowModal(!showModal) : {}
                    }
                  >
                    <element.icon className="h-8 w-8" />
                  </div>
                );
              }
              return (
                <Link href={element.link || ""} key={`footerlink_${index}`}>
                  <div
                    className={cn(
                      "grid justify-items-center cursor-pointer items-center w-[40px] h-[40px]",
                      buttonVariants({
                        variant:
                          element.link === pathName ? "default" : "ghost",
                        size: "icon",
                      })
                    )}
                    onClick={() =>
                      element.modal ? setShowModal(!showModal) : {}
                    }
                  >
                    <element.icon className="h-8 w-8" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
