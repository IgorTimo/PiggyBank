import { ethers } from "ethers";
import defaultProvider from "../contracts/defaultProvider";
import PiggyBank from "../contracts/prggy_bank/PiggyBank";


const getPiggyBankInfo = async (address) => {
  const piggyBank = PiggyBank(address);
  const owner = await piggyBank.owner();
  const isOver = await piggyBank.isOver();
  const desc = await piggyBank.desc();
  const isWithdrawAvailable = await piggyBank.isWithdrawAvailable();
  const balance = ethers.utils.formatEther(await defaultProvider.getBalance(address));

  return { address, owner, isOver, desc, isWithdrawAvailable, balance }
};

export default getPiggyBankInfo;
