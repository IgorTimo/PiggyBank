import Link from "next/link";


const PiggyBankCard = (props) => {
  const { address, owner, balance } = props;



  return (
    <div className="m-6 rounded border border-pink-500 p-4">
      <h1 className="text-2xl">Owner: {owner}</h1>
      <h1 className="text-2xl">Address: {address}</h1>
      <h1 className="text-2xl">Balance: {balance}</h1>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { address: address },
        }}
      >
        <a className="text-blue-400 hover:underline">
          See details or make deposit
        </a>
      </Link>
    </div>
  );
};

export default PiggyBankCard;
