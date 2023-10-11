/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { SS_USER_DATA } from "./../constants";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const defaultUserData =
    JSON.parse(sessionStorage.getItem(SS_USER_DATA)) || {};
  const [userData, setUserData] = useState(defaultUserData);

  const { isUserLogin } = useContext(AuthContext);
  useEffect(() => {
    sessionStorage.setItem(SS_USER_DATA, JSON.stringify(userData));
  }, [userData]);
  useEffect(() => {
    if (!isUserLogin) {
      setUserData({});
    }
  }, [isUserLogin]);
  const setUserDataHandler = (data) => setUserData(data);
  return (
    <UserContext.Provider value={{ userData, setUserDataHandler }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
