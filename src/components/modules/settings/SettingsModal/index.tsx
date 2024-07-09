import Modal from "@/components/ui/modal";
import { ModalProps } from "@/types/UI/modals";

import { SettingsOptions } from "./settingsOptions";

type SettingsModalProps = ModalProps & {
  showLogoutModal: (show: boolean) => void;
};

export const SettingsModal = ({
  show,
  setShow,
  showLogoutModal,
}: SettingsModalProps) => {
  const handleCloseModal = () => setShow(false);

  return (
    <Modal show={show} onClose={() => handleCloseModal()}>
      <div className="flex flex-col gap-2 w-full">
        <SettingsOptions
          handleCloseModal={handleCloseModal}
          showLogoutModal={showLogoutModal}
        />
      </div>
    </Modal>
  );
};
