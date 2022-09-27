import piggyBankMaster from "../contracts/piggyBankMaster";

const getPiggyBankTypeByAddressAndOwner = async (address, owner) => {
  const arrayOfAddresses = await piggyBankMaster.getPiggyBanksByOwner(owner);
  return arrayOfAddresses.find((info) => info[0] === address)[1];
};

export default getPiggyBankTypeByAddressAndOwner;
