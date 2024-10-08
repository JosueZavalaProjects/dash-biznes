import Image from "next/image";
import Link from "next/link";

import { NavBarProps } from "@/types/UI/NavBar";

import {
  BiznesLogo,
  LogoutIcon,
  SettingsIcon,
} from "../../../../public/assets";
import { BusinessCard } from "../BusinessCard";
import { NavBarOptions } from "./NavBarOptions";
import { NavOption } from "./NavOption";

export const DesktopNavBar = ({
  pathname,
  handleLogout,
  handleShowSettings,
}: NavBarProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link href={"/"}>
          <div className="mb-16 w-44">
            <Image src={BiznesLogo} width={106} height={22} alt="Bisnes Logo" />
          </div>
        </Link>
        <div className="flex flex-col gap-4">
          <div className="">Menu</div>
          <div className="pl-4">
            <NavBarOptions pathname={pathname} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[19rem]">
        <div className="flex flex-col gap-4">
          <div className="">Otros</div>
          <div className="pl-4">
            <NavOption
              icon={{ image: SettingsIcon }}
              text="Ajustes"
              handleOnClick={handleShowSettings}
            />
            <NavOption
              icon={{ image: LogoutIcon }}
              text="Cerrar Sesión"
              handleOnClick={handleLogout}
            />
          </div>
        </div>
        <div>
          <BusinessCard />
        </div>
      </div>
    </>
  );
};
