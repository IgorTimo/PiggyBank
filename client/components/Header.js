import Link from "next/link";
import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useRouter } from "next/router";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";
import Image from "next/image";

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
      if (chainId != process.env.targetChainId) {
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
    <div
      onClick={() => setMenuVisible(false)}
      className="navbar navbar-expand-lg relative flex w-full items-center justify-between border-2 border-pink-300 bg-white py-4 px-4 shadow-md sm:px-6"
    >
      <div className="flex w-full flex-wrap items-center px-8">
        <Link href="/">
          <a>
            <Image
              src="/images/piggypink.svg"
              alt="me"
              width="68"
              height="68"
              className="h-8 w-auto sm:h-10"
            />
          </a>
        </Link>
        <Link href="/piggy_banks">
          <a className="bg-black-400 md:text-black-400 ml-12 block rounded py-2 pr-4 pl-3 text-3xl text-black hover:text-pink-600 dark:text-white md:bg-transparent md:p-0">
            Find PiggyBanks
          </a>
        </Link>
        <Link href="/piggy_banks/new">
          <a className="bg-black-400 md:text-black-400 ml-8 block rounded py-2 pr-4 pl-3 text-3xl text-black hover:text-pink-600 dark:text-white md:bg-transparent md:p-0">
            Create PiggyBank
          </a>
        </Link>
      </div>

      {isMenuVisible && (
        <div
          className="absolute right-28 top-24 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-xl text-pink-700 hover:bg-pink-300"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              onClick={handleFindAddressClick}
            >
              My Piggy Banks
            </button>

            <button
              className="block w-full px-4 py-2 text-xl text-pink-700 hover:bg-pink-300"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
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
            className="flex rounded-2xl border-2 border-pink-500 bg-pink-100 px-[18px] py-1 text-xl hover:bg-pink-300"
            onClick={handleConnectMetamaskClick}
          >
            Connect Metamask
          </button>
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            <span
              className="flex rounded-2xl border-2 bg-pink-100 px-[18px] py-3 text-xl hover:bg-pink-300"
              onClick={() => setMenuVisible(!isMenuVisible)}
            >
              <Jazzicon
                diameter={25}
                seed={jsNumberForAddress(currentAccount)}
              />
              {currentAccount.toString().slice(0, 5) +
                "..." +
                currentAccount.toString().slice(38)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
