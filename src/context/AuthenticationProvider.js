import React, { useState, createContext } from "react";
import { auth } from "../database/firebase/FirebaseConfig";

export const AuthenticationContext = createContext();

const Provider = ({ children }) => {

  const [account, setAccount] = useState(null);
  
  React.useEffect(function setUpAuthListener() {

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
    });

  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        account
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Provider;
