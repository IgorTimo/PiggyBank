import { ethers } from "ethers";
import Link from "next/link";
import { useRef, useState } from "react";
import PiggyBankWithSigner from "../contracts/prggy_bank/PiggyBankWithSigner";

const PiggyBankCard = (props) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const amountRef = useRef();
  const handleDepositClick = async () => {
    const piggyBankWithSigner = PiggyBankWithSigner(props.address);

    try {
      const amount = ethers.utils.parseEther(amountRef.current.value);
      console.log("amount: " + amount)
      const tx = await piggyBankWithSigner.deposit( {value: amount});
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-6 rounded border border-pink-500 p-4">
      <h1 className="text-2xl">Owner: {props.owner}</h1>
      {props.isOver ? (
        <h4>This piggy bank already over:(</h4>
      ) : (
        <button
          onClick={() => console.log("click")}
          disabled={!props.isWithdrawAvailable}
          className={`my-2 rounded border border-orange-300 py-1 px-4  ${
            props.isWithdrawAvailable && "hover:bg-orange-300"
          }`}
        >
          Get withdraw
        </button>
      )}
      {isInputVisible && <input ref={amountRef} type="text" placeholder="how many ether?" className="border rounded ml-4 border-orange-300 py-1 px-4 "/>}
      <button
        onClick={isInputVisible ? handleDepositClick : () => setInputVisible(true)}
        disabled={props.isOver}
        className={`my-2 ml-2 rounded border border-orange-300 py-1 px-4  ${
          !props.isOver && "hover:bg-orange-300"
        }`}
      >
        Deposit
      </button>
      <h6>{props.desc}</h6>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { address: props.address },
        }}
      >
        <a className="text-blue-400 hover:underline">See details or make deposit</a>
      </Link>
    </div>
  );
};

export default PiggyBankCard;
