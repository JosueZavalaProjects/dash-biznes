import { useState } from "react";

import { usePathname } from "next/navigation";

import { LogoutModal } from "../modules/settings/session/modals";
import { SettingsModal } from "../modules/settings/SettingsModal";
import { CollapsedNavBar } from "./Collapsed/CollapsedNavBar";
import { DesktopNavBar } from "./Desktop/DesktopNavBar";

export const Navbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  return (
    <nav className="flex flex-col h-full justify-between text-secondary-gray">
      <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
      <SettingsModal
        show={showSettingsModal}
        setShow={setShowSettingsModal}
        showLogoutModal={setShowLogoutModal}
      />
      {!isCollapsed && (
        <DesktopNavBar
          pathname={pathname}
          handleLogout={() => setShowLogoutModal(true)}
          handleShowSettings={() => setShowSettingsModal(true)}
        />
      )}
      {isCollapsed && (
        <CollapsedNavBar
          pathname={pathname}
          handleLogout={() => setShowLogoutModal(true)}
          handleShowSettings={() => setShowSettingsModal(true)}
        />
      )}
    </nav>
  );
};
