import React, { useState, createContext } from "react";
import { auth } from "../database/firebase/FirebaseConfig";

export const AuthenticationContext = createContext();

const Provider = ({ children }) => {

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(function setUpAuthListener() {

    setLoading(true);
    auth.onAuthStateChanged(user => {
      let account = null;

      if (user) {
        account = {
          id: user.uid,
          email: user.email,
          name: user.name,
        };
      }

      setAccount(account);
      setLoading(false);
    });

  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        account,
        loading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Provider;
