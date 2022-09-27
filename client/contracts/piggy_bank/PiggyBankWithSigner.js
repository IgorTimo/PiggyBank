import metamaskProvider from "../metamaskProvider";
import PiggyBank from "./PiggyBank";

const PiggyBankWithSigner = (address) => {
  const piggyBank = PiggyBank(address);
  const signer = metamaskProvider?.getSigner();
  return piggyBank.connect(signer);
};

export default PiggyBankWithSigner;
