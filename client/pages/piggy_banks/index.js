import FindPiggyBankForm from "../../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../../components/FindUsersPiggyBanksForm";
import Layout from "../../components/Layout";
import OwnerPiggyBanks from "../../components/OwnerPiggyBanks";
import PiggyBankView from "../../components/PiggyBankView";
import piggyBankFactory from "../../contracts/piggy_banks_factory/piggyBankFactory";
import getPiggyBankInfo from "../../utils/getPiggyBankInfo";
import { useEffect } from "react";
import piggyBankMaster from "../../contracts/piggy_banks_factory/Master";
import piggyBankFactoryWithSinger from "../../contracts/piggy_banks_factory/piggyBankFactoryWithSinger";

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

  // useEffect(() => {
  //   (async () => {
  //     console.log("Im here")
  //     if ('0xb48bba10bac56559fb7aa3a64e52b4ae968ef555') {
  //       try {
  //         const response = await piggyBankFactoryWithSinger(piggyBankMaster).getPiggyBanksByOwner(
  //           '0xb48bba10bac56559fb7aa3a64e52b4ae968ef555',
  //         );;
  //         response =  response.map(piggy => {return (piggy[0])})
  //         console.log(response)
  //       }
  //       catch (error) {
  //         console.log(error)
  //         };
  //       }
  //     })()
  //   })

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
      const response = await getPiggyBankInfo(address);
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
      console.log(response)
      const arrayOfAddresses =  response.map(piggy => {return (piggy)})
      return { props: { arrayOfAddresses: arrayOfAddresses,  } };
    } catch (error) {
      console.error(error);
      return {
        props: { address },
      };
    }
  }

  // if (user) {
  //   try {
  //     const arrayOfAddresses = await piggyBankFactory.getPiggyBanksByOwner(
  //       user
  //     );
  //     return { props: { arrayOfAddresses: arrayOfAddresses } };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       props: { address: user },
  //     };
  //   }
  // }

  return {
    props: {},
  };
}
