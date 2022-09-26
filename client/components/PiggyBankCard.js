import Link from "next/link";

const PiggyBankCard = (props) => {
  const { address, owner, balance, type } = props;
  return (
    <div className="my-8 w-full bg-white shadow-md px-8 pt-6 pb-8 mb-4 border-2 border-pink-300">
      <h1 className="text-2xl">Owner: {owner}</h1>
      <h1 className="text-2xl">Address: {address}</h1>
      <h1 className="text-2xl pb-2">Balance: {balance}</h1>
      <h1 className="text-2xl pb-2">Type: {type}</h1>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { address: address },
        }}
      >
        <a className="text-blue-500 text-2xl hover:underline">
          See details or make deposit
        </a>
      </Link>
    </div>
  );
};

export default PiggyBankCard;
