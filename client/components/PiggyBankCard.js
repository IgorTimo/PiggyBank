import Link from "next/link";
import { useEffect, useState } from "react";
import getPiggyBankParentInfo from "../utils/getPiggyBankParentInfo";
import Loader from "./Loader";

const PiggyBankCard = (props) => {
  const [info, setInfo] = useState();
  const { address, type } = props;


  useEffect(() => {
    (async () => {
      try {
        setInfo(await getPiggyBankParentInfo(address));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!info)
    return (
      <div className="my-8 mb-4 w-full border-2 border-pink-300 bg-white px-8 pt-6 pb-8 shadow-md">
        <Loader />
      </div>
    );

  return (
    <Link
      href={{
        pathname: "/piggy_banks",
        query: { address, type },
      }}
    >
      <a>
        <div
          className={`my-8 mb-4 w-full border-2 border-pink-300  px-8 pt-6 pb-8 shadow-md hover:bg-gray-200 ${
            info.isOver ? "bg-gray-400" : "bg-white"
          }`}
        >
          {info.isOver && <h3 className="text-xl text-center text-red-300">This piggy bank is over</h3>}
          <h2 className="text-2xl">Owner: {info.owner}</h2>
          <h2 className="text-2xl">Address: {address}</h2>
          <h2 className="text-2xl">Balance: {info.balance}</h2>
          <h2 className="text-2xl">Type: {type}</h2>
          <h2 className="text-2xl">Description: {info.desc}</h2>
        </div>
      </a>
    </Link>
  );
};

export default PiggyBankCard;
