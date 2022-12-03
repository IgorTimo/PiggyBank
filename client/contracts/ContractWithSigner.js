import metamaskProvider from "./metamaskProvider";

const ContractWithSinger = (contract) => {
  const signer = metamaskProvider?.getSigner();
  return contract.connect(signer);
};

export default ContractWithSinger;
