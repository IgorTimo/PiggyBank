import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import piggyBankFactoryWithSinger from "../../../contracts/piggy_banks_factory/piggyBankFactoryWithSinger";
import { parseEther } from "ethers/lib/utils";
// выбор даты --> https://reactdatepicker.com/#example-specific-date-range
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../../hooks/useAppContext";

const NewPiggyBankPage = () => {
  useEffect(() => {
    document.title = "CreatePiggyBank";
  });
  const router = useRouter();
  const ownerRef = useRef();
  const descRef = useRef();
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  // добавил amountRef, piggyBankType, dateEnd
  const amountRef = useRef();
  const [piggyBankType, setPiggyBankType] = useState("amount");
  // выбор даты
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState()
  const [loader, setLoader] = useState(false)

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    setLoader(true)
    setError()
    // просматриваем ошибку, если адрес не указан 
    if((ownerRef.current.value == "") ){
      setError("No wallet input")
    }
    // по нажатию на кнопку выбираем функцию в зависимости от select
    else{
        if (piggyBankType === "endTime") {
          const dateEnd = Date.parse(startDate);
          // чекаю время 
          if(dateEnd - Date.now() < 0){
            setError("Incorrect end date")
          }
          else{
            try {
              const tx = await piggyBankFactoryWithSinger().createTimePiggyBank(
                ownerRef.current.value,
                descRef.current.value,
                dateEnd
              );
              console.log("tx: ", tx);
              const response = await tx.wait();
              console.log("response: ", response);
              setError("Transaction success")
              setTimeout(() => { 
                router.push({
                pathname: "/piggy_banks",
                query: { user: ownerRef.current.value },
              }); }, 5000);
          } catch (error) {
            console.error(error.code);
            if(error.code == "INVALID_ARGUMENT") {setError("Invalid Wallet")}
            else if(error.code == "ACTION_REJECTED") {setError("Transaction Was Rejected")}
            else {setError("Error")}
          }
        }
      } else {
        if(isNaN(amountRef.current.value) || (amountRef.current.value == "" ) || (amountRef.current.value == 0)){
          setError("Incorrect Amount")
        }
        else{
          console.log("Amount on wei", parseEther(amountRef.current.value));
          try {
            const tx = await piggyBankFactoryWithSinger().createAmmountPiggyBank(
              ownerRef.current.value,
              descRef.current.value,
              parseEther(amountRef.current.value)
            );
            console.log("tx: ", tx);
            const response = await tx.wait();
            console.log("response: ", response);
            setError("Transaction success")
            setTimeout(() => { 
              router.push({
              pathname: "/piggy_banks",
              query: { user: ownerRef.current.value },
            }); }, 5000);
          } catch (error) {
            console.error(error.code);
            if(error.code == "INVALID_ARGUMENT") {setError("Invalid Wallet")}
            else if(error.code == "ACTION_REJECTED") {setError("Transaction Was Rejected")}
            else {setError("Error")}
          }
        }
      }
    }
    setLoader(false)
  }


  console.log("Change PiggyBank Type:", piggyBankType);
  console.log("Date End:", Date.parse(startDate) / 1000);

  return (
    <Layout>
      <h1 className="text-4xl ml-36 mt-6 mb-6">Create your piggy bank!</h1>
      <form className="max-w-6xl ml-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-pink-300 border-2" onSubmit={handleCreateSubmit}>
        <label className="block text-pink-500 text-3xl" htmlFor="owner">
          Enter owner address:
        </label>
        <br />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xl leading-tight focus:outline-none focus:shadow-outline"
          ref={ownerRef}
          name="owner"
          type="text"
          placeholder="enter owner address"
        />
        <br />
        <label className="block text-pink-500 text-3xl mt-3" htmlFor="desc">
          Enter description:
        </label>
        <br />
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-xl leading-tight focus:outline-none focus:shadow-outline"
          ref={descRef}
          name="desc"
          type="text"
          placeholder="enter description"
        />
        <br />


        {/* добавил Select для изменения типа создаваемой копилки */}
        <div>
          <label htmlFor="countries" className="block text-pink-500 text-3xl">
            Select a type Piggy Bank
          </label>
          <select
            value={piggyBankType}
            onChange={(e) => setPiggyBankType(e.target.value)}
            id="countries"
            className="my-2 block w-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="amount">Amount Piggy Bank</option>
            <option value="endTime">Time Piggy Bank</option>
          </select>
        </div>

        <br />

        {/* 
            юзер френдли выбор даты и времени копилки 
            добавил поле для ввода суммы в ETH
            отображение в зависимости от выбора select
        */}

        {piggyBankType === "amount" ? (
          <div>
            <label className="block text-pink-500 text-3xl mt-3" htmlFor="amount">
              Enter amount for Piggy (eth):
            </label>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-xl leading-tight focus:outline-none focus:shadow-outline "
              ref={amountRef}
              name="amount"
              type="text"
              placeholder="enter amount on ETH"
            />
          </div>
        ) : (
          <div>
            <label className="block text-pink-500 text-3xl" htmlFor="date">
              Enter end date in uts:
            </label>
            <br />
            <div className="shadow appearance-none border rounded w-full font-bold text-gray-500 py-4 px-6 leading-tight focus:outline-none focus:shadow-outline">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>
        )}

        <br />
        {currentAccount ? 
        <button disabled = {loader} className="rounded border bg-pink-100 border-pink-300 py-1 px-4 text-xl hover:bg-pink-300"type="submit">
          Create
        </button> :
        <div className="text-4xl text-center text-red-500 font-bold">Please connect with your wallet</div>}
      </form>
      {loader ? <div className="ml-16" role="status">
          <svg aria-hidden="true" class="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div> : null}
      {error ? <div className={error=="Transaction success" ? "flex justify-center text-center text-green-800 border bg-green-300 border-green-300 py-1 px-4 text-2xl hover:bg-green-500 mt-16" : "flex justify-center text-center text-red-800 border bg-red-300 border-red-300 py-1 px-4 text-2xl hover:bg-red-500 mt-16"}>{error}</div> : null}
    </Layout>
  );
};
//wow
export default NewPiggyBankPage;
