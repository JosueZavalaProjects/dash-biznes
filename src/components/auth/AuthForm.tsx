import { useContext, useState } from "react";

import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { signInFirebase, signUpFirebase } from "@/services/authService";
import { EmailBodyType, sendEmail } from "@/services/emailService";
import { initFirebase } from "@/services/firebase";
import {
  getCancelPeriodEnd,
  getCheckoutUrl,
  getPortalUrl,
} from "@/services/stripePayments";
import { CancelPeriod } from "@/types/stripePayments";

import { LoginForm } from "./LoginForm";

const AuthForm = () => {
  const router = useRouter();

  const authCtx = useContext(AuthContext);
  const app = initFirebase();
  const { IsValidSubscription } = useSubscription();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const CreateExpirationTime = (data: any) => {
    const HOURS = 48;
    const expires = +data.expiresIn * 1000 * HOURS;
    const expirationTime = new Date(new Date().getTime() + expires);

    const { localId, email, idToken } = data;
    authCtx.login(idToken, email, localId, expirationTime.toISOString());
  };

  const handleGoPortal = async () => {
    const portalUrl = await getPortalUrl(app);
    router.push(portalUrl);
    authCtx.logout();
  };

  const upgradeToPremium = async () => {
    const checkoutUrl = await getCheckoutUrl(app);
    /* authCtx.logout(); */
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    let response;
    event.preventDefault();

    setIsLoading(true);

    if (isLogin) {
      // SIGN IN
      response = signInFirebase(enteredEmail, enteredPassword);

      response
        .then((res: any) => {
          console.log({ res });
          return res._tokenResponse;
        })
        .then((data: any) => CreateExpirationTime(data))
        .then(async () => await getCancelPeriodEnd(app))
        .then(async (cancelPeriod: CancelPeriod) => {
          const isValidSuscription = IsValidSubscription(cancelPeriod);

          if (!isValidSuscription) {
            upgradeToPremium();

            return;
          }
          router.refresh();
        })
        .catch((err: any) => {
          console.log(err);
          alert(err.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      // SIGN UP
      response = signUpFirebase(enteredEmail, enteredPassword);

      response
        .then((res: any) => {
          return res._tokenResponse;
        })
        .then((data: any) => CreateExpirationTime(data))
        .then(async () => {
          const testBody: EmailBodyType = {
            clientEmail: enteredEmail,
            emailType: "signUp",
          };
          await sendEmail(testBody);
        })
        .then(() => router.refresh())
        .catch((err: any) => {
          console.log(err);
          alert(err.message);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <LoginForm
      isLogin={isLogin}
      isLoading={isLoading}
      enteredEmail={enteredEmail}
      enteredPassword={enteredPassword}
      setEnteredEmail={setEnteredEmail}
      setEnteredPassword={setEnteredPassword}
      switchAuthModeHandler={switchAuthModeHandler}
      submitHandler={submitHandler}
    />
  );
};

export default AuthForm;
