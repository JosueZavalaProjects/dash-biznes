import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

import {
  ActivitiesIcon,
  ActivitiesWhiteIcon,
  BiznesLogo,
  DashboardIcon,
  DashboardWhiteIcon,
  InventoryIcon,
  InventoryWhiteIcon,
  LogoutIcon,
  SalesPointIcon,
  SalesPointWhiteIcon,
  SettingsIcon,
} from "../../../public/assets";

export const Navbar = () => {
  return (
    <nav className="flex flex-col h-full justify-between text-secondary-gray">
      <div className="flex flex-col  gap-4">
        <Link href={"/"}>
          <div className="mb-16 w-44">
            <Image src={BiznesLogo} width={106} height={22} alt="Bisnes Logo" />
          </div>
        </Link>
        <div className="flex flex-col gap-4">
          <div className="">Menu</div>
          <div className="pl-4">
            <NavOption
              text="Dashboard"
              icon={{ image: DashboardIcon }}
              selectedIcon={{ image: DashboardWhiteIcon }}
              isSelected
            />
            <NavOption
              icon={{ image: ActivitiesIcon }}
              selectedIcon={{ image: ActivitiesWhiteIcon }}
              text="Actividades"
            />
            <NavOption
              icon={{ image: InventoryIcon }}
              selectedIcon={{ image: InventoryWhiteIcon }}
              text="Inventario"
            />
            <NavOption
              icon={{ image: SalesPointIcon, width: 30, height: 30 }}
              selectedIcon={{
                image: SalesPointWhiteIcon,
                width: 30,
                height: 30,
              }}
              text="Punto de venta"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[19rem]">
        <div className="flex flex-col gap-4">
          <div className="">Otros</div>
          <div className="pl-4">
            <NavOption icon={{ image: SettingsIcon }} text="Ajustes" />
            <NavOption icon={{ image: LogoutIcon }} text="Cerrar Sesión" />
          </div>
        </div>
        <div>
          <div className="flex w-full h-22 bg-gradient-to-r from-secondary-light-blue to-main-blue/70 rounded-lg">
            <div className="grid justify-items-center items-center p-4">
              <span className="grid justify-items-center items-center w-14 h-14 rounded-full bg-white">
                Img
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-third-blue font-light">Negocio</div>
              <div className="text-cadet-grey">Ver el perfil &gt; </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

type IconType = {
  image: StaticImport;
  width?: number | `${number}`;
  height?: number | `${number}`;
};

type NavOptionProps = {
  text: string;
  icon: IconType;
  selectedIcon?: IconType;
  isSelected?: boolean;
};

const NavOption = ({
  isSelected,
  text,
  icon,
  selectedIcon = icon,
}: NavOptionProps) => {
  return (
    <div
      className={`flex w-56 gap-2 p-4 rounded-3xl font-semibold cursor-pointer ${
        isSelected ? "bg-main-blue text-white" : ""
      }`}
    >
      <Link href={"/"}>
        <span>
          <Image
            src={isSelected ? selectedIcon.image : icon.image}
            width={selectedIcon.width || 21}
            height={selectedIcon.width || 21}
            alt={`${text} icon`}
          />
        </span>
      </Link>

      {text}
    </div>
  );
};
