import { useContext } from "react";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import AuthContext from "@/context/AuthContext";

export const Profile = () => {
  const authCtx = useContext(AuthContext);
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
          <SimpleButton>Editar</SimpleButton>
        </div>
        <div className="grid pt-8 gap-4">
          <div className="flex w-1/2 gap-8">
            <Text size="xl" color="dark" weight="bold" className="w-1/2">
              Email
            </Text>
            <Text size="xl" color="dark" className="w-1/2">
              {authCtx?.email || "email@test.com"}
            </Text>
          </div>
          <div className="flex gap-8 w-1/2">
            <Text size="xl" color="dark" weight="bold" className="w-1/2">
              Nombre
            </Text>
            <Text size="xl" color="dark" className="w-1/2">
              Juan Lopez
            </Text>
          </div>
          <div className="flex gap-8 w-1/2">
            <Text size="xl" color="dark" weight="bold" className="w-1/2">
              Contraseña
            </Text>
            <Text size="xl" color="dark" className="w-1/2">
              *******
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
