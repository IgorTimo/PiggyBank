

const PiggyBankView = (props) => {
  const {address, owner, isOver, desc, isWithdrawAvailable, balance } = props;

  return (
    <div className="my-6">
      <h1 className="text-2xl">Owner: {owner}</h1>
      <h1 className="text-2xl">Address: {address}</h1>
      <h1 className="text-2xl">Balance: {balance}</h1>
      {isOver ? (
        <h4>This piggy bank already over:(</h4>
      ) : (
        <button
          onClick={() => console.log("click")}
          disabled={!isWithdrawAvailable}
          className={`my-2 rounded border border-orange-300 py-1 px-4  ${props.isWithdrawAvailable && "hover:bg-orange-300"
            }`}
        >
          Get withdraw
        </button>
      )}
      <h6>{desc}</h6>
    </div>
  );
};

export default PiggyBankView;
