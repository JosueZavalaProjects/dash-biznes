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
import { NavOption } from "./CollapsedNavOption";

export const NavBarOptions = ({ pathname }: { pathname: string }) => {
  return (
    <>
      <NavOption
        icon={{ image: DashboardIcon }}
        selectedIcon={{ image: DashboardWhiteIcon }}
        link="/"
        isSelected={pathname === "/"}
      />
      <NavOption
        icon={{ image: ActivitiesIcon }}
        selectedIcon={{ image: ActivitiesWhiteIcon }}
        link="/activities"
        isSelected={pathname === "/activities"}
      />
      <NavOption
        icon={{ image: InventoryIcon }}
        selectedIcon={{ image: InventoryWhiteIcon }}
        link="/inventory"
        isSelected={pathname === "/inventory"}
      />
      <NavOption
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
