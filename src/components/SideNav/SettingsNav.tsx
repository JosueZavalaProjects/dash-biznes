import { useState } from "react";
import { MdOutlineSettings } from "react-icons/md";

import Link from "next/link";

import { LogoutModal } from "../modules/settings/session/modals";

export const SettingsNav = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowMenu(false);
    setShowLogoutModal(true);
  };

  return (
    <div className="text-gray-900 absolute right-4 top-4 cursor-pointer">
      <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
      <MdOutlineSettings
        className="w-8 h-8"
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className="grid absolute bg-white text-gray-500 w-60 right-0.5 mt-2 rounded-lg border border-gray-200 z-10 ">
          <Link href={"/subscription"}>
            <div
              className="hover:bg-main-blue hover:text-white p-4 rounded-lg"
              onClick={() => setShowMenu(!showMenu)}
            >
              Cancelar Subscripción
            </div>
          </Link>
          <Link href={"/profile"}>
            <div
              className="hover:bg-main-blue hover:text-white p-4 rounded-lg"
              onClick={() => setShowMenu(!showMenu)}
            >
              Cambiar Contraseña
            </div>
          </Link>
          <div
            className="hover:bg-main-blue hover:text-white p-4 rounded-lg"
            onClick={() => handleOpenModal()}
          >
            Cerrar Sesion
          </div>
        </div>
      )}
    </div>
  );
};
