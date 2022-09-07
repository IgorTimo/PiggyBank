import Link from "next/link";
import { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useRouter } from "next/router";
import { useAppContext } from "../hooks/useAppContext";

import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";

const Header = () => {
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const [isMenuVisible, setMenuVisible] = useState(false);

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
    <div className="relative mt-4 flex justify-between">
      <div>
        <Link href="/">
          <a className="text-2xl">Home</a>
        </Link>
        <Link href="/piggy_banks">
          <a className="ml-4 text-2xl">Piggy Banks</a>
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
