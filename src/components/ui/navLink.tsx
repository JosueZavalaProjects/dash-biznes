import { IconType } from "react-icons/lib";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./buttons/button";

type NavLinkProps = {
  link: {
    title: string;
    label?: string;
    icon: LucideIcon | IconType;
    variant: "default" | "ghost";
    href: string;
    onClick?: () => void;
  };
  index?: number;
};

const CollapseNavLink = ({ link }: NavLinkProps) => {
  const pathName = usePathname();
  if (link.onClick) {
    return (
      <div
        className={cn(
          buttonVariants({
            variant: link.href === pathName ? "default" : "ghost",
            size: "icon",
          }),
          "h-9 w-9 cursor-pointer",
          link.variant === "default" &&
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-black"
        )}
        onClick={() => {
          link.onClick ? link.onClick() : {};
        }}
      >
        <link.icon className="h-4 w-4" />
        <span className="sr-only">{link.title}</span>
      </div>
    );
  }
  return (
    <Link
      href={link.href}
      className={cn(
        buttonVariants({
          variant: link.href === pathName ? "default" : "ghost",
          size: "icon",
        }),
        "h-9 w-9",
        link.variant === "default" &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-black"
      )}
    >
      <link.icon className="h-4 w-4" />
      <span className="sr-only">{link.title}</span>
    </Link>
  );
};

const NavLink = ({ link, index }: NavLinkProps) => {
  const pathName = usePathname();
  if (link.onClick) {
    return (
      <div
        key={index}
        className={cn(
          buttonVariants({
            variant: link.href === pathName ? "default" : "ghost",
            size: "sm",
          }),
          "cursor-pointer",
          link.variant === "default" &&
            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-black",
          "justify-start"
        )}
        onClick={() => {
          link.onClick ? link.onClick() : {};
        }}
      >
        <link.icon className="mr-2 h-4 w-4" />
        {link.title}
        {link.label && (
          <span
            className={cn(
              "ml-auto",
              link.variant === "default" && "text-background dark:text-black"
            )}
          >
            {link.label}
          </span>
        )}
      </div>
    );
  }

  return (
    <Link
      key={index}
      href={link.href}
      className={cn(
        buttonVariants({
          variant: link.href === pathName ? "default" : "ghost",
          size: "sm",
        }),
        link.variant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-black",
        "justify-start"
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      {link.title}
      {link.label && (
        <span
          className={cn(
            "ml-auto",
            link.variant === "default" && "text-background dark:text-black"
          )}
        >
          {link.label}
        </span>
      )}
    </Link>
  );
};

export { NavLink, CollapseNavLink };
