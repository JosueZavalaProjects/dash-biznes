import Image from "next/image";

import Modal from "@/components/ui/modal";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { ModalType } from "@/types/UI/common";

import { ErrorIcon, SuccessIcon } from "../../../public/assets";
import { Loading } from "./components/Loading";

type RequestModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  modalType?: ModalType;
  successMessage?: string;
  errorMessage?: string;
};

export const RequestModal = ({
  show,
  modalType = "loading",
  setShow,
  successMessage,
  errorMessage,
}: RequestModalProps) => {
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      {modalType === "error" && (
        <Error setShow={setShow} errorMessage={errorMessage} />
      )}
      {modalType === "success" && (
        <Success setShow={setShow} successMessage={successMessage} />
      )}
      {modalType === "loading" && (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      )}
    </Modal>
  );
};

const Success = ({
  setShow,
  successMessage = "Realizado correctamente",
}: {
  setShow: (show: boolean) => void;
  successMessage?: string;
}) => {
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        {successMessage}
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => setShow(false)}>Continuar</SimpleButton>
      </div>
    </div>
  );
};

const Error = ({
  setShow,
  errorMessage = "Hubó un error en la solicitud",
}: {
  setShow: (show: boolean) => void;
  errorMessage?: string;
}) => {
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={ErrorIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        {errorMessage}
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => setShow(false)}>Cerrar</SimpleButton>
      </div>
    </div>
  );
};
