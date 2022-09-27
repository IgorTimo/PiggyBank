import Link from "next/link";
import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useRouter } from "next/router";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";
import { RINKEBY_ID } from "../contracts/constants/constants";
import Image from 'next/image'

const Header = () => {
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    const handleChangeAccount = (accounts) => {
      updateContextState({ currentAccount: accounts[0] });
    };
    const handleChangeNetwork = (chainId) => {
      if (chainId != RINKEBY_ID) {
        disconnectMetamask(updateContextState);
      }
    };
    if (ethereum) {
      ethereum.on("accountsChanged", handleChangeAccount);
      ethereum.on("chainChanged", handleChangeNetwork);
      return () => {
        ethereum.removeListener("accountsChanged", handleChangeAccount);
        ethereum.removeListener("chainChanged", handleChangeNetwork);
      };
    }
  }, []);

  const handleConnectMetamaskClick = async () => {
    connectMetamask(updateContextState);
  };

  const handleDisconnectMetamaskClick = async () => {
    setMenuVisible(false);
    disconnectMetamask(updateContextState);
  };

  const router = useRouter();

  const handleFindAddressClick = () => {
    setMenuVisible(false);
    router.push({
      pathname: "/piggy_banks",
      query: { user: currentAccount },
    });
  };
  return (
    <div onClick={() => setMenuVisible(false)} className="navbar navbar-expand-lg shadow-md py-4 bg-white relative flex items-center w-full justify-between px-4 sm:px-6 border-2 border-pink-300">
      <div className="px-8 w-full flex flex-wrap items-center">
        <Link href="/">
        <a><Image src="/images/piggypink.svg" alt="me" width="68" height="68" className="h-8 w-auto sm:h-10" /></a>
        </Link>
        <Link href="/piggy_banks">
          <a className="ml-12 text-3xl block py-2 pr-4 pl-3 text-black bg-black-400 rounded md:bg-transparent md:text-black-400 md:p-0 dark:text-white hover:text-pink-600">Find PiggyBanks</a>
        </Link>
        <Link href="/piggy_banks/new">
          <a className="ml-8 text-3xl block py-2 pr-4 pl-3 text-black bg-black-400 rounded md:bg-transparent md:text-black-400 md:p-0 dark:text-white hover:text-pink-600">Create PiggyBank</a>
        </Link>
      </div>

      {isMenuVisible && (
        <div className="absolute right-28 top-24 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1">
            <button
              className="w-full text-pink-700 block px-4 py-2 text-xl hover:bg-pink-300" role="menuitem" tabIndex="-1" id="menu-item-0"
              onClick={handleFindAddressClick}
            >
              My Piggy Banks
            </button>

            <button
              className="w-full text-pink-700 block px-4 py-2 text-xl hover:bg-pink-300" role="menuitem" tabIndex="-1" id="menu-item-1"
              onClick={handleDisconnectMetamaskClick}
            >
              Log out
            </button>
          </div>
        </div>
      )}
      <div className="px-24">
      {!currentAccount ? (
        <button
          className="flex rounded-2xl border-2 border-pink-500 px-[18px] py-1 text-xl bg-pink-100 hover:bg-pink-300"
          onClick={handleConnectMetamaskClick}
        >
          Connect Metamask
        </button>
      ) : (
        <div onClick={e => e.stopPropagation()}>
        <span
          className="flex rounded-2xl border-2 px-[18px] py-3 text-xl bg-pink-100 hover:bg-pink-300"
          onClick={() => setMenuVisible(!isMenuVisible)}
        >
          <Jazzicon diameter={25} seed={jsNumberForAddress(currentAccount)} />
          {currentAccount.toString().slice(0, 5) +
            "..." +
            currentAccount.toString().slice(38)}
        </span>
        </div>
      )}
      </div>
    </div>
  )
};

export default Header;
