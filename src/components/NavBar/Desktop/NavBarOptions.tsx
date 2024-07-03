import {
  ActivitiesIcon,
  ActivitiesWhiteIcon,
  DashboardIcon,
  DashboardWhiteIcon,
  InventoryIcon,
  InventoryWhiteIcon,
  SalesPointIcon,
  SalesPointWhiteIcon,
} from "../../../../public/assets";
import { NavOption } from "./NavOption";

export const NavBarOptions = ({ pathname }: { pathname: string }) => {
  return (
    <>
      <NavOption
        text="Dashboard"
        icon={{ image: DashboardIcon }}
        selectedIcon={{ image: DashboardWhiteIcon }}
        link="/"
        isSelected={pathname === "/"}
      />
      <NavOption
        text="Actividades"
        icon={{ image: ActivitiesIcon }}
        selectedIcon={{ image: ActivitiesWhiteIcon }}
        link="/activities"
        isSelected={pathname === "/activities"}
      />
      <NavOption
        text="Inventario"
        icon={{ image: InventoryIcon }}
        selectedIcon={{ image: InventoryWhiteIcon }}
        link="/inventory"
        isSelected={pathname === "/inventory"}
      />
      <NavOption
        text="Punto de venta"
        icon={{ image: SalesPointIcon, width: 30, height: 30 }}
        selectedIcon={{
          image: SalesPointWhiteIcon,
          width: 30,
          height: 30,
        }}
        link="/salesPoint"
        isSelected={pathname === "/salesPoint"}
      />
    </>
  );
};
