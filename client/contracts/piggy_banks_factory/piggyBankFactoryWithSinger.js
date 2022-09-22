import metamaskProvider from "../metamaskProvider";

const piggyBankFactoryWithSinger = (factory) => {
  const signer = metamaskProvider.getSigner();
  return factory.connect(signer);
};

export default piggyBankFactoryWithSinger;
