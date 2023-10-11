/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { SS_LOGIN_KEY } from "./../constants";
export const AuthContext = createContext();
//const SS_LOGIN_KEY = "isUserLogin";
const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(
    sessionStorage.getItem(SS_LOGIN_KEY) === "true"
  );
  useEffect(() => {
    sessionStorage.setItem(SS_LOGIN_KEY, isUserLogin);
  }, [isUserLogin]);
  const loginHandler = () => setIsUserLogin(true);
  const logoutHandler = () => setIsUserLogin(false);
  return (
    <AuthContext.Provider value={{ isUserLogin, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
