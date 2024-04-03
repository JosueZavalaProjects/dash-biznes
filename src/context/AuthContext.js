"use client";
import React, { useCallback, useEffect, useState } from "react";

import { deleteCookie, getCookie, setCookie } from "cookies-next";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token, email, expirationTime) => {},
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
  let initialToken;
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState("");
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!token);

  const tokenData = retrieveStoredToken();

  if (tokenData) initialToken = tokenData.token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserIsLoggedIn(false);
    deleteCookie("token");
    deleteCookie("expirationTime");
    deleteCookie("email");
    deleteCookie("products");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (userEmail, token, expirationTime) => {
    setToken(token);
    setUserIsLoggedIn(true);
    setEmail(userEmail);

    setCookie("token", token);
    setCookie("expirationTime", expirationTime);
    setCookie("email", userEmail);

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

  useEffect(() => {
    const _email = getCookie("email");
    const _token = getCookie("token");

    if (_email) setEmail(_email);
    if (_token) setToken(_token);
  }, []);

  const contextValue = {
    token: token,
    email: email,
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
