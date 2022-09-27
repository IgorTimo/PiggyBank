import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useRef } from "react";

const DepositButton = ({ setError, setPending, piggyBankWithSigner }) => {
  const router = useRouter();
  const amountRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError();

    try {
      const amount = ethers.utils.parseEther(amountRef.current.value);
      const tx = await piggyBankWithSigner.deposit({ value: amount });
      await tx.wait();
      router.reload();
    } catch (error) {
      if (error.code === "INSUFFICIENT_FUNDS") {
        setError("Not Enough Funds");
      } else if (error.code === "INVALID_ARGUMENT") {
        setError("Invalid Input");
      } else if (error.code === "ACTION_REJECTED") {
        setError("Transaction was Rejected");
      } else {
        setError("Error");
      }
      setTimeout(() => {
        setError("");
      }, 2000);
      console.error(error);
    }
    setPending(false);
  };

  return (
    <form className="inline-block" onSubmit={handleSubmit}>
      <label className="p-3 text-2xl" htmlFor="amount">
        Amount in ether:
      </label>
      <input
        name="amount"
        ref={amountRef}
        type="text"
        placeholder="how many ether?"
        className="my-2 ml-2 rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl"
      />
      <button
        type="submit"
        className={`my-2 ml-2 rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl hover:bg-pink-300  `}
      >
        Deposit
      </button>
    </form>
  );
};

export default DepositButton;
