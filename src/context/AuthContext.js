"use client";
import React, { useCallback, useEffect, useState } from "react";

import { deleteCookie, getCookie, setCookie } from "cookies-next";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});

const calculationRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  if (!isWindowDefined()) return;

  const storedToken = getCookie("token");
  const storedExpirationDate = getCookie("expirationTime");

  const remainingTime = calculationRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    deleteCookie("token");
    deleteCookie("expirationTime");
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

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserIsLoggedIn(false);
    deleteCookie("token");
    deleteCookie("expirationTime");

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
      return;
    }

    if (tokenData) {
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
