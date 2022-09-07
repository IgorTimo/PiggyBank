import React, { createContext, useState, useEffect } from "react";
import provider from "../contracts/metamaskProvider";
const Context = createContext();

function Provider(props) {
  const [currentAccount, setCurrentAccount] = useState();
  useEffect(() => {
    sessionStorage.getItem("currentAccount") &&
      setCurrentAccount(sessionStorage.getItem("currentAccount"));
  }, []);
  const handleConnectMetamaskClick = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      sessionStorage.setItem("currentAccount", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{ currentAccount, setCurrentAccount, handleConnectMetamaskClick }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, Provider };
