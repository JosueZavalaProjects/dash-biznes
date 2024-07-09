"use client";
import { useContext } from "react";

import { useRouter } from "next/navigation";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Modal from "@/components/ui/modal";
import Text from "@/components/ui/text";
import AuthContext from "@/context/AuthContext";
import { ModalProps } from "@/types/UI/modals";

export const LogoutModal = ({ show, setShow }: ModalProps) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authCtx.logout();
      router.push("/");
      router.refresh();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Confirmation handleLogout={handleLogout} setShow={setShow} />
    </Modal>
  );
};

type ConfirmationProps = {
  handleLogout: () => Promise<void>;
  setShow: (show: boolean) => void;
};
const Confirmation = ({ handleLogout, setShow }: ConfirmationProps) => {
  return (
    <div className="grid gap-4">
      <Text color="gray" size="xl" className="text-center">
        ¿Estas segur@ que quieres cerrar sesión?
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleLogout()}>Si</SimpleButton>
      </div>
      <div className="flex justify-center">
        <SimpleButton bgColor="gray" onClick={() => setShow(false)}>
          No
        </SimpleButton>
      </div>
    </div>
  );
};
