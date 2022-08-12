import { useState, useEffect } from "react";
import getPiggyBankInfo from "../utils/getPiggyBankInfo";
import Layout from "./Layout";
import PiggyBankCard from "./PiggyBankCard";

const OwnerPiggyBanks = ({ arrayOfAddresses }) => {
    const [piggyBanks, setPiggyBanks] = useState([])

    useEffect(() => {
        (async () => {
            const piggyBanks = []
            for(let i = 0; i < arrayOfAddresses.length; i++){
                const response = {...(await getPiggyBankInfo(arrayOfAddresses[i])), address: arrayOfAddresses[i]};
                piggyBanks.push(response)
            }
            console.log("PiggyBanks: ", piggyBanks)
            setPiggyBanks(piggyBanks)
        })()
    }, []);

    const renderPiggyBanks = piggyBanks.map((piggyBank => <PiggyBankCard {...piggyBank} key={piggyBank.address}/>))

  return (
    <Layout>
      {renderPiggyBanks}
    </Layout>
  );
};

export default OwnerPiggyBanks;
