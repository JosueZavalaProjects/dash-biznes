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
    <>
      <div className="fixed right-4 top-4 cursor-pointer">
        <MdOutlineSettings
          className="w-8 h-8"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen z-10 ${
          !showMenu ? "hidden" : ""
        }`}
      >
        <div
          onClick={() => setShowMenu(false)}
          className={`fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-opacity-50 ${
            !showMenu ? "hidden" : ""
          }`}
        ></div>
        <div className="absolute text-gray-900 right-4 top-12 z-20 bg-white">
          <LogoutModal show={showLogoutModal} setShow={setShowLogoutModal} />
          {showMenu && (
            <div className="grid absolute bg-white text-gray-500 w-60 right-0.5 mt-2 rounded-lg border border-gray-200 ">
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
      </div>
    </>
  );
};
