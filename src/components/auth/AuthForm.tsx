import { useContext, useState } from "react";

import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { signInFirebase, signUpFirebase } from "@/services/authService";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    let response;
    event.preventDefault();

    setIsLoading(true);

    if (isLogin) {
      response = signInFirebase(enteredEmail, enteredPassword);
    } else {
      response = signUpFirebase(enteredEmail, enteredPassword);
    }

    response
      .then((res: any) => {
        return res._tokenResponse;
      })
      .then((data: any) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );

        const { localId, email } = data;
        authCtx.login(email, localId, expirationTime.toISOString());
        router.refresh();
      })
      .catch((err: any) => {
        alert(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
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
