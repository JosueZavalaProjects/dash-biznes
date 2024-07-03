import { usePathname } from "next/navigation";

import { CollapsedNavBar } from "./Collapsed/CollapsedNavBar";
import { DesktopNavBar } from "./Desktop/DesktopNavBar";

export const Navbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full justify-between text-secondary-gray">
      {!isCollapsed && <DesktopNavBar pathname={pathname} />}
      {isCollapsed && <CollapsedNavBar pathname={pathname} />}
    </nav>
  );
};
