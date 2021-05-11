import React, {useCallback, useEffect, useState} from "react";
export const TokenContext = React.createContext();

export const TokenProvider = ({children}) => {
  //   const history = useHistory();
  const [token, setToken] = useState(
    window.localStorage.getItem("token")
      ? window.localStorage.getItem("token")
      : null
  );

  const retrieveToken = useCallback(() => {
    if (!token) {
      return;
    } else {
      setToken(() => window.localStorage.getItem("token"));
      return token;
    }
  }, [token]);
  useEffect(() => {
    retrieveToken();
  }, [retrieveToken]);

  return (
    <TokenContext.Provider value={{token}}>{children}</TokenContext.Provider>
  );
};
