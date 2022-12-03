import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useRef } from "react";
import getErrorMessage from "../utils/getErrorMessage";

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
      const message = getErrorMessage(error.code);
      setError(message);
      setTimeout(() => {
        setError("");
      }, 2000);
      console.error(message);
    } finally {
      setPending(false);
    }
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
