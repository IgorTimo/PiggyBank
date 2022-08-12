import PiggyBank from "../contracts/PiggyBank";

const getPiggyBankInfo = async (address) => {
  const piggyBank = PiggyBank(address);
  const owner = await piggyBank.owner();
  const isOver = await piggyBank.isOver();
  const desc = await piggyBank.desc();
  const isWithdrawAvailable = await piggyBank.isWithdrawAvailable();
  return { owner, isOver, desc, isWithdrawAvailable }
};

export default getPiggyBankInfo;
