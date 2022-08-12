const PiggyBankView = (props) => {
  return (
    <div className="my-6">
      <h1 className="text-2xl">Owner: {props.owner}</h1>
      {props.isOver ? (
        <h4>This piggy bank already over:(</h4>
      ) : (
        <button
          onClick={() => console.log("click")}
          disabled={!props.isWithdrawAvailable}
          className={`my-2 rounded border border-orange-300 py-1 px-4  ${
            props.isWithdrawAvailable && "hover:bg-orange-300"
          }`}
        >
          Get withdraw
        </button>
      )}
      <h6>{props.desc}</h6>
    </div>
  );
};

export default PiggyBankView;
