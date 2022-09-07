import Link from "next/link";
import { useState } from "react";
import { Modal } from "./Modal";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useRouter } from "next/router";
import { useAppContext } from "../hooks/useAppContext";

import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";

const Header = () => {
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const [modalShown, toggleModal] = useState(false);

  const handleConnectMetamaskClick = async () => {
    connectMetamask(updateContextState)
  };

  const handleDisconnectMetamaskClick = async () => {
    disconnectMetamask(updateContextState)
  };



  const handleToggleClick = () => {
    toggleModal(!modalShown);
  };

  const router = useRouter();

  const handleFindAddressSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/piggy_banks",
      query: { user: currentAccount },
    });
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
      <div className="text-center">
        <Modal modalShown={modalShown} handleToggleClick={handleToggleClick}>
          <div onClick={handleToggleClick} className="flex justify-between">
            <button
              className="rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
              onClick={handleDisconnectMetamaskClick}
            >
              Log out
            </button>

            <button
              className="rounded-2xl border-2 border-orange-300 px-[15px] py-2 text-xl hover:bg-orange-300"
              onClick={handleFindAddressSubmit}
            >
              My Piggy_banks
            </button>
          </div>
        </Modal>
      </div>

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
          onClick={handleToggleClick}
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
