import {
  AccountsIcon,
  CardIcon,
  FlagIcon,
  LogoutGrayIcon,
  PadlockIcon,
  ProfileIcon,
  QuestionIcon,
  StoreIcon,
  TermsIcon,
} from "../../../../../public/assets";
import { SettingsOption } from "./settingsOption";

export const SettingsOptions = ({
  handleCloseModal,
  showLogoutModal,
}: {
  handleCloseModal: () => void;
  showLogoutModal: (show: boolean) => void;
}) => {
  const handleLogout = () => {
    handleCloseModal();
    showLogoutModal(true);
  };
  return (
    <>
      <SettingsOption
        text="Editar Perfil"
        icon={ProfileIcon}
        link="/profile"
        handleCloseModal={handleCloseModal}
      />
      <SettingsOption
        text="Mi subscripción"
        icon={CardIcon}
        link="/subscription"
        handleCloseModal={handleCloseModal}
      />
      <SettingsOption
        text="Cambiar Contraseña"
        icon={PadlockIcon}
        link="/profile"
        handleCloseModal={handleCloseModal}
      />
      {/* TODO: */}
      <SettingsOption
        text="Tipo de empresa"
        icon={StoreIcon}
        handleCloseModal={handleCloseModal}
      />
      <SettingsOption
        text="Soporte & Ayuda"
        icon={QuestionIcon}
        handleCloseModal={handleCloseModal}
      />
      <SettingsOption
        text="Terminos y condiciones"
        icon={TermsIcon}
        handleCloseModal={handleCloseModal}
      />
      <SettingsOption
        text="Reportar un problema"
        icon={FlagIcon}
        handleCloseModal={handleCloseModal}
      />
      <SettingsOption
        text="Administrar cuentas"
        icon={AccountsIcon}
        handleCloseModal={handleCloseModal}
      />
      {/* TODO: */}
      <SettingsOption
        text="Cerrar Sesión"
        icon={LogoutGrayIcon}
        handleCloseModal={handleLogout}
      />
    </>
  );
};
