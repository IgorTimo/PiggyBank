import Link from "next/link";
import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useRouter } from "next/router";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";
import { RINKEBY_ID } from "../contracts/constants/constants";
import logo from './piggypink.jpg';

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
    <div className="navbar navbar-expand-lg shadow-md py-4 bg-white relative flex items-center w-full justify-between">
      <img src={logo} alt="Logo" />
      <div className="px-8 w-full flex flex-wrap items-center">
        <Link href="/">
          <a className="text-4xl block py-2 pr-4 pl-3 text-white bg-pink-400 rounded md:bg-transparent md:text-pink-400 md:p-0 dark:text-white">Home</a>
        </Link>
        <Link href="/piggy_banks">
          <a className="ml-4 text-3xl block py-2 pr-4 pl-3 text-black bg-black-400 rounded md:bg-transparent md:text-black-400 md:p-0 dark:text-white">Piggy Banks</a>
        </Link>
      </div>

      {isMenuVisible && (
        <div className="absolute right-0 top-12 rounded-2xl border-2 border-orange-300 bg-white p-4">
          <button
            className="rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
            onClick={handleDisconnectMetamaskClick}
          >
            Log out
          </button>

          <button
            className="ml-4 rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
            onClick={handleFindAddressClick}
          >
            My Piggy Banks
          </button>
        </div>
      )}

      {!currentAccount ? (
        <button
          className="rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
          onClick={handleConnectMetamaskClick}
        >
          Connect Metamask
        </button>
      ) : (
        <span
          className="flex rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
          onClick={() => setMenuVisible(!isMenuVisible)}
        >
          <Jazzicon diameter={25} seed={jsNumberForAddress(currentAccount)} />
          {currentAccount.toString().slice(0, 5) +
            "..." +
            currentAccount.toString().slice(38)}
        </span>
      )}
    </div>
  );
};

export default Header;
