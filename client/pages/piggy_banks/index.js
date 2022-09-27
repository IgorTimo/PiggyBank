import FindPiggyBankForm from "../../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../../components/FindUsersPiggyBanksForm";
import Layout from "../../components/Layout";
import OwnerPiggyBanks from "../../components/OwnerPiggyBanks";
import PiggyBankView from "../../components/PiggyBankView";
import getPiggyBankParentInfo from "../../utils/getPiggyBankParentInfo";
import { useEffect } from "react";
import piggyBankMaster from "../../contracts/piggy_banks_factory/Master";
import getPiggyBankTypeByAddressAndOwner from "../../utils/getPiggyBankTypeByAddressAndOwner";

const PiggyBanksPage = (props) => {
  useEffect(() => {
    document.title = "PiggyBank";
  });
  if (props.arrayOfAddressesAndTypes) {
    if (props.arrayOfAddressesAndTypes.length > 0) {
      return (
        <OwnerPiggyBanks
          arrayOfAddressesAndTypes={props.arrayOfAddressesAndTypes}
        />
      );
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
          <h1 className="mt-16 flex justify-center border border-red-300 bg-red-300 py-1 px-4 text-center text-2xl text-red-800 hover:bg-red-500">
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
  const { user, address, type } = props.query;

  if (address) {
    try {
      const response = await getPiggyBankParentInfo(address);
      return {
        props: {
          piggyBankInfo: {
            ...response,
            type:
              type ||
              (await getPiggyBankTypeByAddressAndOwner(
                address,
                response.owner
              )),
          },
        },
      };
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
      return { props: { arrayOfAddressesAndTypes: response } };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {},
  };
}
