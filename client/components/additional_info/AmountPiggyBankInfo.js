import { ethers } from "ethers";
import { useEffect, useState } from "react";
import AmountPiggyBank from "../../contracts/additional_piggy_banks/AmountPiggyBank";

const AmountPiggyBankInfo = ({ address }) => {
  const [targetAmount, setTargetAmount] = useState("");
  const amountPiggyBank = AmountPiggyBank(address);

  useEffect(() => {
    (async () => {
      try {
        const targetAmount = await amountPiggyBank.targetAmount();
        setTargetAmount(ethers.utils.formatEther(targetAmount));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <h2 className="text-2xl">Target Amount: {targetAmount}</h2>;
};

export default AmountPiggyBankInfo;
