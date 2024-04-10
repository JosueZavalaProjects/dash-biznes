import { useState } from "react";

import { Input, KeyValueTypes } from "@/components/ui/input";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { passwordReset } from "@/services/authService";
import { PasswordResetModalStep } from "@/types/settings";

import { ChangePasswordModal } from "./modals";

type ProfileFormProps = {
  email: string;
  name: string;
  handleSetValues: (newValue: string, keyValue: KeyValueTypes) => void;
};
export const ProfileForm = ({
  email,
  name,
  handleSetValues,
}: ProfileFormProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<PasswordResetModalStep>(
    PasswordResetModalStep.confirm
  );

  const handlePasswordReset = () => {
    setIsLoading(true);
    const response = passwordReset(email);

    response
      .then((res) => {
        setModalStep(PasswordResetModalStep.success);
      })
      .catch((error) => {
        setModalStep(PasswordResetModalStep.error);
        throw new Error("Something went wrong please try again later.");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="grid pt-8 gap-4">
      <ChangePasswordModal
        show={showModal}
        setShow={setShowModal}
        modalStep={modalStep}
        setModalStep={setModalStep}
        handlePasswordReset={handlePasswordReset}
        isLoading={isLoading}
      />
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Email
        </Text>
        <Text size="xl" color="dark" className="w-1/2">
          {email || "email@test.com"}
        </Text>
      </div>
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Nombre
        </Text>
        <Text size="xl" color="dark" className="w-1/2">
          {name}
        </Text>
      </div>
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Contraseña
        </Text>
        <div className="flex-1">
          <SimpleButton onClick={() => setShowModal(true)}>
            Cambiar Contraseña
          </SimpleButton>
        </div>
      </div>
    </div>
  );
};
