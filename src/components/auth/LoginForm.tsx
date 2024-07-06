import Image from "next/image";

import { SimpleButton } from "../ui/buttons/simpleButton";
import { BiznesLogo } from "../../../public/assets";
import { ContainerCard } from "../ui/containerCard";

type LoginFormProps = {
  isLogin: boolean;
  isLoading: boolean;
  enteredEmail: string;
  enteredPassword: string;
  setEnteredEmail: (value: string) => void;
  setEnteredPassword: (value: string) => void;
  switchAuthModeHandler: () => void;
  submitHandler: (event: React.ChangeEvent<HTMLFormElement>) => void;
};

export const LoginForm = ({
  isLogin,
  isLoading,
  enteredEmail,
  enteredPassword,
  setEnteredEmail,
  setEnteredPassword,
  switchAuthModeHandler,
  submitHandler,
}: LoginFormProps) => {
  return (
    <section className="flex flex-col mx-auto mt-20 w-[30rem] gap-4">
      <ContainerCard>
        <div className="flex flex-col items-center gap-12 p-8">
          <Image alt="logo" src={BiznesLogo} width={350} />

          <form onSubmit={submitHandler}>
            <div className="flex flex-col items-center w-[18rem] gap-2">
              <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEnteredEmail(e.currentTarget.value)
                }
                placeholder="Correo electronico"
                className="bg-gray-200 rounded-lg w-full p-3"
                required
              />
              <input
                type="password"
                id="password"
                value={enteredPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEnteredPassword(e.currentTarget.value)
                }
                placeholder="Contraseña"
                className="bg-gray-200 rounded-lg w-full p-3"
                required
              />
              <div className="flex w-full pt-6">
                {isLogin && (
                  <SimpleButton className="w-full" disabled={isLoading}>
                    {isLoading && <p>Enviando Petición...</p>}
                    {!isLoading && <p>Iniciar Sesión</p>}
                  </SimpleButton>
                )}
                {!isLogin && (
                  <SimpleButton className="w-full" disabled={isLoading}>
                    {isLoading && <p>Enviando Petición...</p>}
                    {!isLoading && <p>Crear Cuenta</p>}
                  </SimpleButton>
                )}
              </div>
              {/* <span className="pt-4 text-gray-500 cursor-pointer">
                ¿Olvidaste tu contraseña?
              </span> */}
            </div>
          </form>
        </div>
      </ContainerCard>
      <ContainerCard>
        <div className="flex flex-col items-center gap-12 p-8">
          <div className="flex gap-2">
            {isLogin && <>¿No Tienes una cuenta?</>}
            {!isLogin && <>¿Ya Tienes una cuenta?</>}
            <span
              onClick={() => switchAuthModeHandler()}
              className="text-main-blue cursor-pointer"
            >
              {isLogin && <>Registrate</>}
              {!isLogin && <>Inicia Sesión</>}
            </span>
          </div>
        </div>
      </ContainerCard>
    </section>
  );
};
