import { useState, useRef } from "react";
import { ethers } from "ethers";
import PiggyBankWithSigner from "../contracts/prggy_bank/PiggyBankWithSigner";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";


const PiggyBankView = (props) => {
  const {address, owner, isOver, desc, isWithdrawAvailable, balance, type} = props;
  const [isInputVisible, setInputVisible] = useState(false);
  const amountRef = useRef();
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const [error, setError] = useState()
  const [loader, setLoader] = useState(false)

  const handleConnectMetamaskClick = async () => {
    connectMetamask(updateContextState);
  };

  const handleDepositClick = async () => {
    setLoader(true)
    setError()
    const piggyBankWithSigner = PiggyBankWithSigner(address);
    try {
      const amount = ethers.utils.parseEther(amountRef.current.value);
      const tx = await piggyBankWithSigner.deposit({ value: amount });
      await tx.wait();
      if(tx){setError("Transaction Success")
      setTimeout(() => {setError()}, 2000)}
    } catch (error) {
      if(error.code === "INSUFFICIENT_FUNDS") {setError('Not Enough Funds')}
      else if(error.code === "INVALID_ARGUMENT") {setError('Invalid Input')}
      else if(error.code === "ACTION_REJECTED") {setError('Transaction was Rejected')}
      else {setError("Error")}
      setTimeout(() => {setError()}, 2000)
      console.error(error.code);
    }
    setLoader(false)
  };

  return (
    <div className="my-6 w-full bg-white shadow-md px-8 pt-6 pb-8 mb-4 border-2 border-pink-300 ">
      <h1 className="text-2xl">Owner: {owner}</h1>
      <h1 className="text-2xl">Address: {address}</h1>
      <h1 className="text-2xl">Balance: {balance}</h1>
      <h2 className="text-2xl">Description: {desc}</h2>
      <h2 className="text-2xl">Type: {type}</h2>

      {isOver ? (
        <h4>This piggy bank already over:(</h4>
      ) : (<>
         {currentAccount ? ( <>  
          { currentAccount != owner.toLowerCase() ? null : 
          <button
            onClick={() => console.log("click")}
            disabled={!isWithdrawAvailable}
            className={`my-2 rounded border bg-pink-100 border-pink-300 py-1 px-4 text-xl hover:bg-pink-300  ${props.isWithdrawAvailable && "hover:bg-pink-300"}`
          }>
            Get withdraw
          </button>}
            {isInputVisible && (
              <input
                ref={amountRef}
                type="text"
                placeholder="how many ether?"
                className="my-2 ml-2 rounded border bg-pink-100 border-pink-300 py-1 px-4 text-xl"
              />
            )}
  
            {loader ? 
            <div role="status">
              <svg aria-hidden="true" class="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div> :      <button
            onClick={isInputVisible ? handleDepositClick : () => setInputVisible(true)}
            disabled={isOver}
            className={`my-2 ml-2 rounded border bg-pink-100 border-pink-300 py-1 px-4 text-xl hover:bg-pink-300  ${!isOver && "hover:bg-pink-300"}`
          }>
            Deposit
          </button> }

          
             
          </>) : <div className="flex justify-center"><button
          className="rounded-2xl border-2 border-pink-500 px-[18px] py-1 text-5xl font-semibold bg-pink-100 hover:bg-pink-300"
          onClick={handleConnectMetamaskClick}
        >
          Connect Metamask
        </button></div>
         }
          {/* {loader ? 
            <div role="status">
              <svg aria-hidden="true" class="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div> :      <button
            onClick={isInputVisible ? handleDepositClick : () => setInputVisible(true)}
            disabled={isOver}
            className={`my-2 ml-2 rounded border bg-pink-100 border-pink-300 py-1 px-4 text-xl hover:bg-pink-300  ${!isOver && "hover:bg-pink-300"}`
          }>
            Deposit
          </button> } */}
          {error ? <div className={error=="Transaction Success" ? "flex justify-center w-1/3 text-green-800 border bg-green-400 py-1 px-4 font-bold text-3xl" : "flex justify-center w-1/3 text-red-800 border bg-red-400 py-1 px-4 font-bold text-3xl"}>{error}</div> : null}
        </>
      )}
    </div>
  );
};

export default PiggyBankView;