import { useState, useEffect } from "react";
import getPiggyBankParentInfo from "../utils/getPiggyBankParentInfo";
import Layout from "./Layout";
import PiggyBankCard from "./PiggyBankCard";

const OwnerPiggyBanks = ({ arrayOfAddresses }) => {
  const [piggyBanks, setPiggyBanks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const piggyBanks = [];
        for (let i = 0; i < arrayOfAddresses.length; i++) {
          const response = {
            ...(await getPiggyBankParentInfo(arrayOfAddresses[i][0])),
            type: arrayOfAddresses[i][1]
          };
          piggyBanks.push(response);
        }
        setPiggyBanks(piggyBanks.reverse());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const renderPiggyBanks = piggyBanks.map((piggyBank) => (
    <PiggyBankCard {...piggyBank} key={piggyBank.address} />
  ));

  return <Layout>{renderPiggyBanks}</Layout>;
};

export default OwnerPiggyBanks;
