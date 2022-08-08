import Link from "next/link";
import { useState, useEffect } from "react";
import provider from "../contracts/provider";

const Header = () => {
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
    <div className="mt-4 flex justify-between">
      <div>
        <Link href="/">
          <a className="text-2xl">Home</a>
        </Link>
        <Link href="/piggy_banks">
          <a className="ml-4 text-2xl">Piggy Banks</a>
        </Link>
      </div>
      {!currentAccount ? (
        <button
          className="rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
          onClick={handleConnectMetamaskClick}
        >
          Connect Metamask
        </button>
      ) : (
        <span>{currentAccount}</span>
      )}
    </div>
  );
};

export default Header;
