import amountPiggyBankFactory from "../contracts/piggy_banks_factory/amountPiggyBankFactory";
import ContractWithSinger from "../contracts/ContractWithSigner";
import { parseEther } from "ethers/lib/utils";

const createAmountPiggyBank = async (owner, desc, additionalInfo) => {
  console.log("Amount Piggy");
  if (!additionalInfo?.amount) {
    throw new Error("Incorrect Amount");
  }
  const tx = await ContractWithSinger(
    amountPiggyBankFactory
  ).createAmountPiggyBank(owner, desc, parseEther(additionalInfo.amount));

  await tx.wait();
};

export default createAmountPiggyBank;
