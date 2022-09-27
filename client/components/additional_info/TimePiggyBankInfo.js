import { useEffect, useState } from "react";
import TimePiggyBank from "../../contracts/additional_piggy_banks/TimePiggyBank";

const TimePiggyBankInfo = ({address}) => {
  const [endTime, setEndTime] = useState(0);
  const timePiggyBank = TimePiggyBank(address);

  useEffect(() => {
    (async () => {
      try {
        setEndTime(await timePiggyBank.endTime());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <h2 className="text-2xl">End Time: {(new Date(endTime * 1000)).toLocaleString()}</h2>;
};

export default TimePiggyBankInfo;
