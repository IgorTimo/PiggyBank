import AmountPiggyBankFactory from "../contracts/piggy_banks_factory/AmountPiggyBankFactory";
import ContractWithSinger from "../contracts/ContractWithSigner";
import { parseEther } from "ethers/lib/utils";

const createAmmountPiggyBank = async (owner, desc, additionalInfo) => {
  console.log("Amount Piggy");
  if (!additionalInfo?.amount) {
    throw new Error("Incorrect Amount");
  }
  const tx = await ContractWithSinger(
    AmountPiggyBankFactory
  ).createAmountPiggyBank(owner, desc, parseEther(additionalInfo.amount));

  await tx.wait();
};

export default createAmmountPiggyBank;
