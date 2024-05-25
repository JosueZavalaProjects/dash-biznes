import { useState } from "react";

import { Auth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/modals/components/Loading";
import Modal from "@/components/ui/modal";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { EmailBodyType, sendEmail } from "@/services/emailService";
import { initFirebase } from "@/services/firebase";
import { getPortalUrl } from "@/services/stripePayments";
import { SubscriptionModalStep } from "@/types/settings";

import { SuccessIcon } from "../../../../../../public/assets";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  userEmail: string;
  isLoading: boolean;
  setIsLoading: (show: boolean) => void;
};

export const SubcriptionModal = ({
  show,
  setShow,
  userEmail,
  isLoading,
  setIsLoading,
}: ModalProps) => {
  const [modalStep, setModalStep] = useState<SubscriptionModalStep>(
    SubscriptionModalStep.confirm
  );
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      {isLoading && (
        <div className="grid justify-items-center items-center">
          <Loading />
        </div>
      )}
      {!isLoading && modalStep === SubscriptionModalStep.confirm && (
        <Confirmation
          setModalStep={setModalStep}
          setShow={setShow}
          userEmail={userEmail}
          setIsLoading={setIsLoading}
        />
      )}
      {!isLoading && modalStep === SubscriptionModalStep.success && (
        <Success setModalStep={setModalStep} setShow={setShow} />
      )}
    </Modal>
  );
};

type ConfirmationProps = {
  setModalStep: (step: SubscriptionModalStep) => void;
  setShow: (show: boolean) => void;
  userEmail: string;
  setIsLoading: (show: boolean) => void;
};
const Confirmation = ({
  setModalStep,
  setShow,
  userEmail,
  setIsLoading,
}: ConfirmationProps) => {
  const app = initFirebase();
  const router = useRouter();

  const manageSubscription = async () => {
    const portalUrl = await getPortalUrl(app);
    setModalStep(SubscriptionModalStep.success);
    setIsLoading(false);
    router.push(portalUrl);
    console.log("Manage Subscription");
  };

  const sendCancelSubcriptionEmail = async () => {
    const testBody: EmailBodyType = {
      clientEmail: userEmail,
      emailType: "cancelSubscription",
    };
    const response = await sendEmail(testBody);
    console.log(response);
  };

  const handleDelete = () => {
    setIsLoading(true);
    sendCancelSubcriptionEmail();
    manageSubscription();
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
        Seras redirigido a Stripe para cancelar tu subscripción
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleContinue()}>Continuar</SimpleButton>
      </div>
    </div>
  );
};
