"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";

/* import useLocalStorage from "@/hooks/useLocalStorage"; */
import { setCookie } from "cookies-next";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});
/* const AuthContext = createContext(); */

const calculationRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  if (!isWindowDefined()) return;
  const storedToken = window.localStorage?.getItem("token");
  const storedExpirationDate = window.localStorage.getItem("expirationTime");

  const remainingTime = calculationRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const isWindowDefined = () => typeof window !== "undefined";

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!token);

  /* const userIsLoggedIn = !!token; */

  const logoutHandler = useCallback(() => {
    setToken(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expirationTime");
    setUserIsLoggedIn(false);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    setUserIsLoggedIn(true);

    setCookie("token", token);
    setCookie("expirationTime", expirationTime);

    const remainingTime = calculationRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (!isWindowDefined()) {
      /* console.log(isWindowDefined()); */
      return;
    }
    /* console.log(window); */

    if (tokenData) {
      /* console.log(tokenData.duration); */
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
