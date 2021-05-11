import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [userData, setuserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const history = useHistory();

  const retrieveData = useCallback(() => {
    if (!userData) {
      history.push("/login");
    } else {
      return setuserData(() =>
        localStorage.getItem("userData")
          ? JSON.parse(localStorage.getItem("userData"))
          : null
      );
    }
  }, [history, userData]);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return (
    <AuthContext.Provider value={{userData}}>{children}</AuthContext.Provider>
  );
};
