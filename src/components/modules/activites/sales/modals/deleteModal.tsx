import Image from "next/image";

import { Loading } from "@/components/modals/components/Loading";
import Modal from "@/components/ui/modal";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { SalesModalStep } from "@/types/sales";

import { SuccessIcon } from "../../../../../../public/assets";

type SalesModalProps = {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  isLoading: boolean;
  deleteSale: () => Promise<void>;
  modalStep: SalesModalStep;
  setModalStep: (step: SalesModalStep) => void;
};
export const SalesModal = ({
  showModal,
  setShowModal,
  isLoading,
  deleteSale,
  modalStep,
  setModalStep,
}: SalesModalProps) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && modalStep === SalesModalStep.delete && (
        <Delete handleDelete={deleteSale} setShowModal={setShowModal} />
      )}
      {!isLoading && modalStep === SalesModalStep.deleteConfirm && (
        <Confirmation setModalStep={setModalStep} setShowModal={setShowModal} />
      )}
    </Modal>
  );
};

type DeleteProps = {
  handleDelete: () => Promise<void>;
  setShowModal: (newValue: boolean) => void;
};
const Delete = ({ handleDelete, setShowModal }: DeleteProps) => (
  <div className="grid gap-4">
    <Text color="gray" size="xl" className="text-center">
      Estas segur@ que quieres eliminar la venta
    </Text>
    <div className="flex justify-center">
      <SimpleButton onClick={() => handleDelete()}>Si</SimpleButton>
    </div>
    <div className="flex justify-center">
      <SimpleButton bgColor="gray" onClick={() => setShowModal(false)}>
        No, regresar a la tabla
      </SimpleButton>
    </div>
  </div>
);

type ConfirmationProps = {
  setModalStep: (step: SalesModalStep) => void;
  setShowModal: (newValue: boolean) => void;
};
const Confirmation = ({ setModalStep, setShowModal }: ConfirmationProps) => {
  const handleContinue = () => {
    setShowModal(false);
    setModalStep(SalesModalStep.delete);
  };

  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        ¡Listo! Eliminaste esta venta éxitosamente
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleContinue()}>Continuar</SimpleButton>
      </div>
    </div>
  );
};
