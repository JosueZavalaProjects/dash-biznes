"use client";

import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import { CollapseNavLink, NavLink } from "./navLink";
import { IconType } from "react-icons/lib";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon | IconType;
    variant: "default" | "ghost";
    href: string;
    onClick?: () => void;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <CollapseNavLink link={link} />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavLink link={link} key={index} />
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
