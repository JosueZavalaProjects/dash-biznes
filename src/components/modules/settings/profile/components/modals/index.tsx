import Image from "next/image";

import { Loading } from "@/components/modals/components/Loading";
import Modal from "@/components/ui/modal";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { PasswordResetModalStep } from "@/types/settings";

import { ErrorIcon, SuccessIcon } from "../../../../../../../public/assets";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  modalStep: PasswordResetModalStep;
  setModalStep: (step: PasswordResetModalStep) => void;
  handlePasswordReset: () => void;
  isLoading: boolean;
};

export const ChangePasswordModal = ({
  show,
  setShow,
  modalStep,
  setModalStep,
  handlePasswordReset,
  isLoading,
}: ModalProps) => {
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && modalStep === PasswordResetModalStep.confirm && (
        <Confirmation
          setShow={setShow}
          handlePasswordReset={handlePasswordReset}
        />
      )}
      {!isLoading && modalStep === PasswordResetModalStep.success && (
        <Success setModalStep={setModalStep} setShow={setShow} />
      )}
      {!isLoading && modalStep === PasswordResetModalStep.error && (
        <Error setModalStep={setModalStep} setShow={setShow} />
      )}
    </Modal>
  );
};

type ConfirmationProps = {
  setShow: (show: boolean) => void;
  handlePasswordReset: () => void;
};
const Confirmation = ({ setShow, handlePasswordReset }: ConfirmationProps) => {
  const handleConfirm = () => {
    handlePasswordReset();
  };
  return (
    <div className="grid gap-4">
      <Text color="gray" size="xl" className="text-center">
        Da click en el boton para enviarte un link de verificación a tu email
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleConfirm()}>
          Enviar link de verificación
        </SimpleButton>
      </div>
      <div className="flex justify-center">
        <SimpleButton bgColor="gray" onClick={() => setShow(false)}>
          cancelar
        </SimpleButton>
      </div>
    </div>
  );
};

type SuccessProps = {
  setModalStep: (step: PasswordResetModalStep) => void;
  setShow: (show: boolean) => void;
};
const Success = ({ setModalStep, setShow }: SuccessProps) => {
  const handleContinue = () => {
    setModalStep(PasswordResetModalStep.confirm);
    setShow(false);
  };
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        ¡Se ha enviado el correo exitosamente!
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleContinue()}>Continuar</SimpleButton>
      </div>
    </div>
  );
};

type ErrorProps = {
  setModalStep: (step: PasswordResetModalStep) => void;
  setShow: (show: boolean) => void;
};
const Error = ({ setModalStep, setShow }: ErrorProps) => {
  const handleContinue = () => {
    setModalStep(PasswordResetModalStep.confirm);
    setShow(false);
  };
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={ErrorIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        Algo salió mal por favor intente nuevamente.
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleContinue()}>Volver</SimpleButton>
      </div>
    </div>
  );
};
