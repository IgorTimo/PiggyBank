import Link from "next/link";

const PiggyBankCard = (props) => {
  const { address, owner, isOver, balance, type, desc } = props;

  return (
    <Link
      href={{
        pathname: "/piggy_banks",
        query: { address: address },
      }}
    >
      <a>
        <div className="my-8 mb-4 w-full border-2 border-pink-300 bg-white px-8 pt-6 pb-8 shadow-md">
          <h1 className="text-2xl">Owner: {owner}</h1>
          <h1 className="text-2xl">Address: {address}</h1>
          <h1 className="text-2xl">Balance: {balance}</h1>
          <h1 className="text-2xl">Type: {type}</h1>
          <h1 className="text-2xl">Description: {desc}</h1>
          <h1 className="text-2xl">
            PiggyBank is over: {isOver ? "yes" : "no"}
          </h1>
        </div>
      </a>
    </Link>
  );
};

export default PiggyBankCard;
