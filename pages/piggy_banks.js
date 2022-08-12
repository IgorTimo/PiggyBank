import Layout from "../components/Layout";
import OwnerPiggyBanks from "../components/OwnerPiggyBanks";
import PiggyBankView from "../components/PiggyBankView";
import getPiggyBankInfo from "../utils/getPiggyBankInfo";


const PiggyBanksPage = (props) => {
  console.log("props: ", props);

  if(props.arrayOfAddresses){
    return <OwnerPiggyBanks arrayOfAddresses={props.arrayOfAddresses}/>
  }



  return (
    <Layout>
      <div>
        {props.address && <h1>{props.address} is not correct!</h1>}
        {props.owner ? (
          <PiggyBankView {...props}/>
        ) : <form>Some form</form>}
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
        const response  = await getPiggyBankInfo(address);
        return { props:  response};
      } catch (error) {
        console.error(error);
        return {
          props: { address },
        };
      }
    }

    if(user){
      return {props: {arrayOfAddresses: ["0x46F171D9F3F109b829606F11C7bB6c6E42245201", "0xDf7fe403Eb133Eb940cCfCaCCd52Ae663E0FAcF7"]}}
    }
  
    return {
      props: {},
    };
  }


