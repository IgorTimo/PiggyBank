import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import PiggyBankWithSigner from "../contracts/prggy_bank/PiggyBankWithSigner";
import { useAppContext } from "../hooks/useAppContext";
import DepositButton from "./DepositButton";
import Loader from "./Loader";

const ParentPiggyBankControlButtons = ({
  address,
  owner,
  isWithdrawAvailable,
}) => {
  const [error, setError] = useState();
  const [isPending, setPending] = useState(false);
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const router = useRouter();

  const piggyBankWithSigner = PiggyBankWithSigner(address);

  const handleConnectMetamaskClick = async () => {
    connectMetamask(updateContextState);
  };

  if (isPending) return <Loader />;

  return (
    <>
      {currentAccount ? (
        <>
          {currentAccount === owner.toLowerCase() && (
            <button
              onClick={() => console.log("click")}
              disabled={!isWithdrawAvailable}
              className={`my-2 rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl   ${
                isWithdrawAvailable && "cursor-pointer hover:bg-pink-300"
              }`}
            >
              Get withdraw
            </button>
          )}
          <DepositButton
            setError={setError}
            setPending={setPending}
            piggyBankWithSigner={piggyBankWithSigner}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <button
            className="rounded-2xl border-2 border-pink-500 bg-pink-100 px-[18px] py-1 text-5xl font-semibold hover:bg-pink-300"
            onClick={handleConnectMetamaskClick}
          >
            Connect Metamask
          </button>
        </div>
      )}
      {error && (
        <div
          className={"flex w-1/3 justify-center border bg-red-400 py-1 px-4 text-3xl font-bold text-red-800"}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default ParentPiggyBankControlButtons;
