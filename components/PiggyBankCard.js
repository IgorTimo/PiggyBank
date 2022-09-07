import { ethers } from "ethers";
import Link from "next/link";
import { useRef, useState } from "react";
import PiggyBankWithSigner from "../contracts/prggy_bank/PiggyBankWithSigner";


const PiggyBankCard = (props) => {
  const { address, owner, isOver, desc, isWithdrawAvailable, balance } = props;
  const [isInputVisible, setInputVisible] = useState(false);
  const amountRef = useRef();

  const handleDepositClick = async () => {
    const piggyBankWithSigner = PiggyBankWithSigner(address);
    try {
      const amount = ethers.utils.parseEther(amountRef.current.value);
      const tx = await piggyBankWithSigner.deposit({ value: amount });
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-6 rounded border border-pink-500 p-4">
      <h1 className="text-2xl">Owner: {owner}</h1>
      <h1 className="text-2xl">Address: {address}</h1>
      <h1 className="text-2xl">Balance: {balance}</h1>
      {isOver ? (
        <h4>This piggy bank already over:</h4>
      ) : (
        <button
          onClick={() => console.log("click")}
          disabled={!isWithdrawAvailable}
          className={`my-2 rounded border border-orange-300 py-1 px-4  ${
            isWithdrawAvailable && "hover:bg-orange-300"
          }`}
        >
          Get withdraw
        </button>
      )}
      {isInputVisible && (
        <input
          ref={amountRef}
          type="text"
          placeholder="how many ether?"
          className="ml-4 rounded border border-orange-300 py-1 px-4 "
        />
      )}
      <button
        onClick={
          isInputVisible ? handleDepositClick : () => setInputVisible(true)
        }
        disabled={isOver}
        className={`my-2 ml-2 rounded border border-orange-300 py-1 px-4  ${
          !isOver && "hover:bg-orange-300"
        }`}
      >
        Deposit
      </button>
      <h6>{desc}</h6>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { address: address },
        }}
      >
        <a className="text-blue-400 hover:underline">
          See details or make deposit
        </a>
      </Link>
    </div>
  );
};

export default PiggyBankCard;
