import FindPiggyBankForm from "../../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../../components/FindUsersPiggyBanksForm";
import Layout from "../../components/Layout";
import OwnerPiggyBanks from "../../components/OwnerPiggyBanks";
import PiggyBankView from "../../components/PiggyBankView";
import getPiggyBankParentInfo from "../../utils/getPiggyBankParentInfo";
import { useEffect } from "react";
import piggyBankMaster from "../../contracts/piggy_banks_factory/Master";

const PiggyBanksPage = (props) => {
  useEffect(() => {
    document.title = "PiggyBank";
  });
  if (props.arrayOfAddresses) {
    if (props.arrayOfAddresses.length > 0) {
      return <OwnerPiggyBanks arrayOfAddresses={props.arrayOfAddresses} />;
    } else {
      return (
        <Layout>
          <h1 className="text-7xl">This user has no piggy banks</h1>
        </Layout>
      );
    }
  }  

  return (
    <Layout>
      <div className="mt-12 ">
        {props.address && (
          <h1 className="flex justify-center text-center text-red-800 border bg-red-300 border-red-300 py-1 px-4 text-2xl hover:bg-red-500 mt-16">
            {props.address} is not correct or empty! Try again with another
            address
          </h1>
        )}
        {props.piggyBankInfo ? (
          <PiggyBankView {...props.piggyBankInfo} />
        ) : (
          <>
            <FindPiggyBankForm />
            <FindUsersPiggyBanksForm />
          </>
        )}
      </div>
    </Layout>
  );
};

export default PiggyBanksPage;

export async function getServerSideProps(props) {
  const address = props.query.address;
  const user = props.query.user;

  if (address) {
    try {
      const response = await getPiggyBankParentInfo(address);
      return { props: { piggyBankInfo: response } };
    } catch (error) {
      console.error(error);
      return {
        props: { address },
      };
    }
  }

  if (user) {
    try {
      const response = await piggyBankMaster.getPiggyBanksByOwner(user);
      return { props: { arrayOfAddresses: response,  } };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {},
  };
}
