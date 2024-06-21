import Image from "next/image";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/modals/components/Loading";
import Modal from "@/components/ui/modal";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

import { SuccessIcon } from "../../../../../../public/assets";

type UpdateSaleModalProps = {
  showModal: boolean;
  setShowModal: (newValue: boolean) => void;
  isLoading: boolean;
};
export const UpdateSaleModal = ({
  showModal,
  setShowModal,
  isLoading,
}: UpdateSaleModalProps) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && <Confirmation setShowModal={setShowModal} />}
    </Modal>
  );
};

const Confirmation = ({
  setShowModal,
}: {
  setShowModal: (newValue: boolean) => void;
}) => {
  const router = useRouter();
  const handleContinue = () => {
    setShowModal(false);
    router.push("/activities");
  };
  return (
    <div className="grid gap-4">
      <div className="grid justify-items-center">
        <Image src={SuccessIcon} width={108} height={80} alt="success" />
      </div>
      <Text color="gray" size="xl" className="text-center">
        ¡Listo! Actualizaste esta venta éxitosamente
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleContinue()}>Continuar</SimpleButton>
      </div>
    </div>
  );
};
