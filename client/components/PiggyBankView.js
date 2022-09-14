import { useState, useRef } from "react";
import { ethers } from "ethers";
import PiggyBankWithSigner from "../contracts/prggy_bank/PiggyBankWithSigner";
import { useAppContext } from "../hooks/useAppContext";


const PiggyBankView = (props) => {
  const {address, owner, isOver, desc, isWithdrawAvailable, balance} = props;
  const [isInputVisible, setInputVisible] = useState(false);
  const amountRef = useRef();
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const [error, setError] = useState()

  const handleDepositClick = async () => {
    const piggyBankWithSigner = PiggyBankWithSigner(address);
    try {
      const amount = ethers.utils.parseEther(amountRef.current.value);
      const tx = await piggyBankWithSigner.deposit({ value: amount });
      await tx.wait();
    } catch (error) {
setError('not enough money')
console.error(error);

    }
  };

  return (
    <div className="my-6">
      <h1 className="text-2xl">Owner: {owner}</h1>
      <h1 className="text-2xl">Address: {address}</h1>
      <h1 className="text-2xl">Balance: {balance}</h1>
      <h2 className="text-xl">{desc}</h2>
      {isOver ? (
        <h4>This piggy bank already over:(</h4>
      ) : (<>
         {currentAccount ? ( <>
          {error ? <div className="ml-24 font-bold text-3xl text-red-500">{error}</div> : null}    
{ currentAccount != owner.toLowerCase() ? null : <button
                    onClick={() => console.log("click")}
                    disabled={!isWithdrawAvailable}
                    className={`my-2 rounded border border-orange-300 py-1 px-4  ${props.isWithdrawAvailable && "hover:bg-orange-300"
                      }`}
                    >
                    Get withdraw
                    </button>}


                       {isInputVisible && (
                        <input
                          ref={amountRef}
                          type="text"
                          placeholder="how many ether?"
                          className="ml-4 rounded border border-orange-300 py-1 px-4 "
                        />
                      )}
                    <button
        onClick={
          isInputVisible ? handleDepositClick : () => setInputVisible(true)
        }
        disabled={isOver}
        className={`my-2 ml-2 rounded border border-orange-300 py-1 px-4  ${
          !isOver && "hover:bg-orange-300"
        }`}
      >
        Deposit
      </button>    
      </>) : <h1 className="text-4xl text-center text-red-500 font-bold">Please connect with your wallet</h1>
         } 
       
        </>
      )}
      
    </div>
  );
};

export default PiggyBankView;