import Layout from "./Layout";
import PiggyBankCard from "./PiggyBankCard";

const OwnerPiggyBanks = ({ arrayOfAddressesAndTypes }) => {
  const renderPiggyBanks = arrayOfAddressesAndTypes.map((arr) => (
    <PiggyBankCard address={arr[0]} type={arr[1]} key={arr[0]} />
  ));

  return <Layout>{renderPiggyBanks}</Layout>;
};

export default OwnerPiggyBanks;
