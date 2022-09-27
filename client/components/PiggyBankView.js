import CardView from "./CardView";
import ParentPiggyBankControlButtons from "./ParentPiggyBankControlButtons";
import {
  TYPE_AMOUNT_PIGGY_BANK,
  TYPE_APPROVE_PIGGY_BANK,
  TYPE_TIME_PIGGY_BANK,
} from "../contracts/constants/constants";
import AmountPiggyBankInfo from "./additional_info/AmountPiggyBankInfo";
import TimePiggyBankInfo from "./additional_info/TimePiggyBankInfo";
import ApprovePiggyBankInfo from "./additional_info/ApprovePiggyBankInfo";

const PiggyBankView = (props) => {
  const { address, owner, isOver, desc, isWithdrawAvailable, balance, type } =
    props;

  const additionals = {
    [TYPE_AMOUNT_PIGGY_BANK]: <AmountPiggyBankInfo address={address} />,
    [TYPE_TIME_PIGGY_BANK]: <TimePiggyBankInfo address={address}  />,
    [TYPE_APPROVE_PIGGY_BANK]: <ApprovePiggyBankInfo address={address} />,
  };

  return (
    <>
      <h1 className="text-3xl"> Main info</h1>
      <CardView>
        <h2 className="text-2xl">Owner: {owner}</h2>
        <h2 className="text-2xl">Address: {address}</h2>
        <h2 className="text-2xl">Balance: {balance}</h2>
        <h2 className="text-2xl">Description: {desc}</h2>

        {isOver ? (
          <h4>This piggy bank already over:(</h4>
        ) : (
          <ParentPiggyBankControlButtons
            address={address}
            owner={owner}
            isWithdrawAvailable={isWithdrawAvailable}
          />
        )}
      </CardView>
      <h1 className="text-3xl"> Additional info</h1>
      <CardView>
        <h2 className="text-2xl">Type: {type}</h2>
        {additionals[type] || (
          <h2>Unfortunately we do not support this type:(</h2>
        )}
      </CardView>
    </>
  );
};

export default PiggyBankView;
