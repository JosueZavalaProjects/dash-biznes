import Image from "next/image";
import Link from "next/link";

import { NavBarProps } from "@/types/UI/NavBar";

import {
  BiznesSmallLogo,
  LogoutIcon,
  SettingsIcon,
} from "../../../../public/assets";
import { NavOption } from "./CollapsedNavOption";
import { NavBarOptions } from "./CollapsedNavOptions";

export const CollapsedNavBar = ({
  pathname,
  handleLogout,
  handleShowSettings,
}: NavBarProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link href={"/"}>
          <div className="mb-16">
            <Image
              src={BiznesSmallLogo}
              width={30}
              height={23}
              alt="Bisnes Logo"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-4">
          <NavBarOptions pathname={pathname} />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[19rem]">
        <div className="flex flex-col gap-4">
          <NavOption
            icon={{ image: SettingsIcon }}
            handleOnClick={handleShowSettings}
          />
          <NavOption
            icon={{ image: LogoutIcon }}
            handleOnClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};
