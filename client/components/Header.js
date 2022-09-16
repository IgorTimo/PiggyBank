import Link from "next/link";
import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useRouter } from "next/router";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";
import { RINKEBY_ID } from "../contracts/constants/constants";
import logo from '../public/piggypink.jpg'
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
    <div className="navbar navbar-expand-lg shadow-md py-4 bg-white relative flex items-center w-full justify-between px-4 sm:px-6 border-2 border-pink-300">
      <Image src="/piggypink.png" alt="me" width="104" height="104" className="h-8 w-auto sm:h-10" />
      <div className="px-8 w-full flex flex-wrap items-center">
        <Link href="/">
          <a className="text-4xl block py-2 pr-4 pl-3 text-white bg-pink-400 rounded md:bg-transparent md:text-pink-400 md:p-0 dark:text-white hover:text-pink-600">Home</a>
        </Link>
        <Link href="/piggy_banks">
          <a className="ml-4 text-3xl block py-2 pr-4 pl-3 text-black bg-black-400 rounded md:bg-transparent md:text-black-400 md:p-0 dark:text-white hover:text-pink-600">Piggy Banks</a>
        </Link>
      </div>

      {isMenuVisible && (
        <div className="absolute right-28 top-24 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div className="py-1">
            <button
              className="w-full text-pink-700 block px-4 py-2 text-xl hover:bg-pink-300" role="menuitem" tabindex="-1" id="menu-item-0"
              onClick={handleFindAddressClick}
            >
              My Piggy Banks
            </button>

            <button
              className="w-full text-pink-700 block px-4 py-2 text-xl hover:bg-pink-300" role="menuitem" tabindex="-1" id="menu-item-1"
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
        <span
          className="flex rounded-2xl border-2 px-[18px] py-3 text-xl bg-pink-100 hover:bg-pink-300"
          onClick={() => setMenuVisible(!isMenuVisible)}
        >
          <Jazzicon diameter={25} seed={jsNumberForAddress(currentAccount)} />
          {currentAccount.toString().slice(0, 5) +
            "..." +
            currentAccount.toString().slice(38)}
        </span>
      )}
      </div>
    </div>
  )
};

export default Header;
