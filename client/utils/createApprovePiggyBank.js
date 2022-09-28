import ContractWithSinger from "../contracts/ContractWithSigner";
import approvePiggyBankFactory from "../contracts/piggy_banks_factory/ApprovePiggyBankFactory";

const createApprovePiggyBank = async (owner, desc, additionalInfo) => {
  if (!additionalInfo.approver) {
    throw new Error("No wallet apporover input");
  }

  const tx = await ContractWithSinger(
    approvePiggyBankFactory
  ).createApprovePiggyBank(owner, desc, additionalInfo.approver);

  await tx.wait();
};

export default createApprovePiggyBank;
