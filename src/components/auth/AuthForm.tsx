import { useContext, useState } from "react";

import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { signInFirebase, signUpFirebase } from "@/services/authService";
import { EmailBodyType, sendEmail } from "@/services/emailService";
import { initFirebase } from "@/services/firebase";
import { getCancelPeriodEnd, getPortalUrl } from "@/services/stripePayments";
import { CancelPeriod } from "@/types/stripePayments";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const router = useRouter();

  const authCtx = useContext(AuthContext);
  const app = initFirebase();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const isSubcriptionExpired = (cancelAt: Timestamp): boolean => {
    let isExpired = false;
    const { seconds } = cancelAt;
    const cancelAtDate = new Date(seconds * 1000);

    isExpired = new Date(cancelAtDate) < new Date();
    return isExpired;
  };

  const ValidateSubscription = async (cancelPeriod: CancelPeriod) => {
    const { cancelAtPeriodEnd, cancelAt } = cancelPeriod;
    if (!cancelAtPeriodEnd) router.refresh();
    if (cancelAt && !isSubcriptionExpired(cancelAt)) router.refresh();

    if (cancelAt && isSubcriptionExpired(cancelAt)) {
      const portalUrl = await getPortalUrl(app);
      router.push(portalUrl);
      authCtx.logout();
    }
  };

  const CreateExpirationTime = (data: any) => {
    const HOURS = 48;
    const expires = +data.expiresIn * 1000 * HOURS;
    const expirationTime = new Date(new Date().getTime() + expires);

    const { localId, email } = data;
    authCtx.login(email, localId, expirationTime.toISOString());
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    let response;
    event.preventDefault();

    setIsLoading(true);

    if (isLogin) {
      response = signInFirebase(enteredEmail, enteredPassword);

      response
        .then((res: any) => {
          return res._tokenResponse;
        })
        .then((data: any) => CreateExpirationTime(data))
        .then(async () => await getCancelPeriodEnd(app))
        .then((cancelPeriod: CancelPeriod) =>
          ValidateSubscription(cancelPeriod)
        )
        .catch((err: any) => {
          console.log(err);
          alert(err.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      response = signUpFirebase(enteredEmail, enteredPassword);

      response
        .then((res: any) => {
          return res._tokenResponse;
        })
        .then((data: any) => CreateExpirationTime(data))
        .then(async () => {
          // TODO send email new client
          const testBody: EmailBodyType = {
            clientEmail: enteredEmail,
            emailType: "signUp",
          };
          const response = await sendEmail(testBody);
          console.log(response);
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
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Correo Electronico</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnteredEmail(e.currentTarget.value)
            }
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnteredPassword(e.currentTarget.value)
            }
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
