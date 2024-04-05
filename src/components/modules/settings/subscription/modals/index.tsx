import { useState } from "react";

import Image from "next/image";

import Modal from "@/components/ui/modal";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { SubscriptionModalStep } from "@/types/settings";

import { SuccessIcon } from "../../../../../../public/assets";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const SubcriptionModal = ({ show, setShow }: ModalProps) => {
  const [modalStep, setModalStep] = useState<SubscriptionModalStep>(
    SubscriptionModalStep.confirm
  );
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      {modalStep === SubscriptionModalStep.confirm && (
        <Confirmation setModalStep={setModalStep} setShow={setShow} />
      )}
      {modalStep === SubscriptionModalStep.success && (
        <Success setModalStep={setModalStep} setShow={setShow} />
      )}
    </Modal>
  );
};

type ConfirmationProps = {
  setModalStep: (step: SubscriptionModalStep) => void;
  setShow: (show: boolean) => void;
};
const Confirmation = ({ setModalStep, setShow }: ConfirmationProps) => {
  const handleDelete = () => {
    setModalStep(SubscriptionModalStep.success);
  };
  return (
    <div className="grid gap-4">
      <Text color="gray" size="xl" className="text-center">
        ¿Estas segur@ que deseas cancelar tu subscripción?
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleDelete()}>Si</SimpleButton>
      </div>
      <div className="flex justify-center">
        <SimpleButton bgColor="gray" onClick={() => setShow(false)}>
          No
        </SimpleButton>
      </div>
    </div>
  );
};
type SuccessProps = {
  setModalStep: (step: SubscriptionModalStep) => void;
  setShow: (show: boolean) => void;
};
const Success = ({ setModalStep, setShow }: SuccessProps) => {
  const handleContinue = () => {
    setModalStep(SubscriptionModalStep.confirm);
    setShow(false);
  };
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        ¡Tu subscripción ha sido cancelada exitosamente!
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleContinue()}>Continuar</SimpleButton>
      </div>
    </div>
  );
};
