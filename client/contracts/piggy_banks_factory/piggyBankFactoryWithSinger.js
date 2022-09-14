import metamaskProvider from "../metamaskProvider";
import piggyBankFactory from "./piggyBankFactory";

const piggyBankFactoryWithSinger = () => {
  const signer = metamaskProvider.getSigner();
  return piggyBankFactory.connect(signer);
};

export default piggyBankFactoryWithSinger;
