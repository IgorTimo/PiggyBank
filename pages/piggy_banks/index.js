import FindPiggyBankForm from "../../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../../components/FindUsersPiggyBanksForm";
import Layout from "../../components/Layout";
import OwnerPiggyBanks from "../../components/OwnerPiggyBanks";
import PiggyBankView from "../../components/PiggyBankView";
import piggyBankFactory from "../../contracts/piggy_banks_factory/piggyBankFactory";
import getPiggyBankInfo from "../../utils/getPiggyBankInfo";

const PiggyBanksPage = (props) => {
  console.log("props: ", props);

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
      <div>
        {props.address && (
          <h1 className="text-3xl">
            {props.address} is not correct or empty! Try again with another
            address
          </h1>
        )}
        {props.owner ? (
          <PiggyBankView {...props} />
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
      const response = await getPiggyBankInfo(address);
      return { props: { ...response, ...{ contractAddress: address } } };
    } catch (error) {
      console.error(error);
      return {
        props: { address },
      };
    }
  }

  if (user) {
    try {
      const arrayOfAddresses = await piggyBankFactory.getPiggyBanksByAddress(
        user
      );
      return { props: { arrayOfAddresses: arrayOfAddresses } };
    } catch (error) {
      console.error(error);
      return {
        props: { address: user },
      };
    }
  }

  return {
    props: {},
  };
}
