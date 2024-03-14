import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || "");
  const [charID, setCharID] = useState(sessionStorage.getItem("charID") || "");


  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setUserId,
        charID,
        setCharID
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, AuthContext };
