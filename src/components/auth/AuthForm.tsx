import { MutableRefObject, useContext, useRef, useState } from "react";
/* import { useHistory } from "react-router-dom"; */
/* import { signInWithPassword, signUp } from "../../services/authService"; */

import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import {
  signInWithPassword,
  signUp,
  signUpFirebase,
} from "@/services/authService";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  /* const history = useHistory(); */
  const router = useRouter();
  /* const emailInputRef = useRef();
  const passwordInputRef = useRef(); */

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

    /* const enteredEmail = emailInputRef?.current.value;
    const enteredPassword = passwordInputRef?.current.value; */

    setIsLoading(true);

    if (isLogin) {
      response = signInWithPassword(enteredEmail, enteredPassword);
    } else {
      response = signUpFirebase(enteredEmail, enteredPassword);
    }

    /* response.then((res: any) => {
      console.log(res);
    }); */

    response
      .then((res: any) => {
        //setIsLoading(false);

        /*   if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data: any) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        } */
        return res._tokenResponse;
      })
      .then((data: any) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        /* console.log(data.localId);
        console.log(expirationTime.toISOString()); */
        /* authCtx.login(data.idToken, expirationTime.toISOString()); */
        authCtx.login(data.localId, expirationTime.toISOString());
        //history.replace("/");
        /* router.push("/sales-point"); */
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
            /* ref={emailInputRef} */ required
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
            /* ref={passwordInputRef} */
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
