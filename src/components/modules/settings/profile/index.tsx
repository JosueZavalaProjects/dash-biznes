"use client";
import { useContext, useState } from "react";

import { KeyValueTypes } from "@/components/ui/input";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import AuthContext from "@/context/AuthContext";

import { ProfileForm } from "./components/profileForm";
import { ProfileInfo } from "./components/profileInfo";

export const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [email, setEmail] = useState(authCtx?.email);
  const [name, setName] = useState("Josue Zavala");

  const handleSetValues = (newValue: string, keyValue: KeyValueTypes) => {
    if (keyValue === "email") setEmail(newValue);
    if (keyValue === "name") setName(newValue);
  };

  return (
    <div className="grid gap-16 px-8">
      <Text size="3xl" color="dark">
        Perfil
      </Text>
      <div className="grid gap-4">
        <div className="flex justify-between border-b-2 pb-4">
          <Text color="dark" className="self-center">
            Usuario
          </Text>
          {!isEdit && (
            <SimpleButton onClick={() => setIsEdit(true)}>Editar</SimpleButton>
          )}
          {isEdit && (
            <div className="flex gap-4">
              <SimpleButton
                bgColor="white"
                className="!text-gray-500"
                onClick={() => setIsEdit(false)}
              >
                Cancelar
              </SimpleButton>
              <SimpleButton>Guardar</SimpleButton>
            </div>
          )}
        </div>
        {!isEdit && <ProfileInfo email={authCtx?.email} name={name} />}
        {isEdit && (
          <ProfileForm
            email={email}
            name={name}
            handleSetValues={handleSetValues}
          />
        )}
      </div>
    </div>
  );
};
