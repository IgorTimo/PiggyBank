import Layout from "../components/Layout";
import PiggyBank from "../contracts/PiggyBank";


const PiggyBanksPage = (props) => {
  console.log("props: ", props);
  return (
    <Layout>
      <div>
        {props.address && <h1>{props.address} is not correct!</h1>}
        {props.owner ? (
          <div>
            <h1>{props.owner} is owner!</h1>
            <h1>{props.isOver.toString()} is current state!</h1>
            <h1>{props.desc} is desc!</h1>
            <h1>{props.endTime} is end time!</h1>
          </div>
        ) : <form>Some form</form>}
      </div>
    </Layout>
  );
};

export default PiggyBanksPage;

export async function getServerSideProps(props) {
    const address = props.query.address;
    if (address) {
      const piggyBank = PiggyBank(address);
      try {
        const owner = await piggyBank.owner();
        const isOver = await piggyBank.isOver();
        const desc = await piggyBank.desc();
        const endTime = (await piggyBank.endTime()).toNumber();
        return { props: { owner, isOver, desc, endTime } };
      } catch (error) {
        console.error(error);
        return {
          props: { address },
        };
      }
    }
  
    return {
      props: {},
    };
  }


