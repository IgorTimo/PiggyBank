import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import piggyBankFactoryWithSinger from "../../../contracts/piggy_banks_factory/piggyBankFactoryWithSinger";
import { parseEther } from "ethers/lib/utils";
// выбор даты --> https://reactdatepicker.com/#example-specific-date-range

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../../hooks/useAppContext";
import connectMetamask from "../../../utils/connectMetamask";
import AmountPiggyBankFactory from "../../../contracts/piggy_banks_factory/AmountPiggyBankFactory";
import ApprovePiggyBankFactory from "../../../contracts/piggy_banks_factory/ApprovePiggyBankFactory";
import TimePiggyBankFactory from "../../../contracts/piggy_banks_factory/TimePiggyBankFactory";

const NewPiggyBankPage = () => {
  useEffect(() => {
    document.title = "CreatePiggyBank";
  });
  const router = useRouter();
  const ownerRef = useRef();
  const descRef = useRef();
  const approverRef = useRef();
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  // добавил amountRef, piggyBankType, dateEnd
  const amountRef = useRef();
  const [piggyBankType, setPiggyBankType] = useState("amount");
  // выбор даты
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    setError();
    // просматриваем ошибку, если адрес не указан
    if (ownerRef.current.value == "") {
      setError("No wallet input");
      setTimeout(() => {
        setError();
      }, 2000);
    }
    // по нажатию на кнопку выбираем функцию в зависимости от select
    else {
      if (piggyBankType === "amount") {
        console.log("Amount Piggy");
        if (
          isNaN(amountRef.current.value) ||
          amountRef.current.value == "" ||
          amountRef.current.value == 0
        ) {
          setError("Incorrect Amount");
          setTimeout(() => {
            setError();
          }, 2000);
        } else {
          try {
            const tx =
              await piggyBankFactoryWithSinger(AmountPiggyBankFactory).createAmountPiggyBank(
                ownerRef.current.value,
                descRef.current.value,
                parseEther(amountRef.current.value)
              );
              
            console.log("tx: ", tx);
            const response = await tx.wait();
            console.log("response: ", response);
            setError("Transaction success");
            setTimeout(() => {
              router.push({
                pathname: "/piggy_banks",
                query: { user: ownerRef.current.value },
              });
            }, 4000);
          } catch (error) {
            console.error(error.code);
            if (error.code == "INVALID_ARGUMENT") {
              setError("Invalid Wallet");
            } else if (error.code == "ACTION_REJECTED") {
              setError("Transaction Was Rejected");
            } else {
              setError("Error");
            }
            setTimeout(() => {
              setError();
            }, 2000);
          }
        }
      } else if (piggyBankType === "endTime") {
        console.log("Time Piggy");
        const dateEnd = Date.parse(startDate);
        // чекаю время
        if (dateEnd - Date.now() < 0) {
          setError("Incorrect end date");
          setTimeout(() => {
            setError();
          }, 2000);
        } else {
          try {
            const tx = await piggyBankFactoryWithSinger(TimePiggyBankFactory).createTimePiggyBank(
              ownerRef.current.value,
              descRef.current.value,
              dateEnd
            );
            console.log("tx: ", tx);
            const response = await tx.wait();
            console.log("response: ", response);
            setError("Transaction success");
            setTimeout(() => {
              router.push({
                pathname: "/piggy_banks",
                query: { user: ownerRef.current.value },
              });
            }, 4000);
          } catch (error) {
            console.error(error.code);
            if (error.code == "INVALID_ARGUMENT") {
              setError("Invalid Wallet");
            } else if (error.code == "ACTION_REJECTED") {
              setError("Transaction Was Rejected");
            } else {
              setError("Error");
            }
            setTimeout(() => {
              setError();
            }, 2000);
          }
        }
      } else if (piggyBankType === "approve") {
        console.log("Amount Piggy");
        if (approverRef.current.value == "") {
          setError("No wallet apporover input");
          setTimeout(() => {
            setError();
          }, 2000);
        } else {
          try {
            const tx =
              await piggyBankFactoryWithSinger(ApprovePiggyBankFactory).createApprovePiggyBank(
                ownerRef.current.value,
                descRef.current.value,
                approverRef.current.value
              );
            console.log("tx: ", tx);
            const response = await tx.wait();
            console.log("response: ", response);
            setError("Transaction success");
            setTimeout(() => {
              router.push({
                pathname: "/piggy_banks",
                query: { user: ownerRef.current.value },
              });
            }, 4000);
          } catch (error) {
            console.error(error.code);
            if (error.code == "INVALID_ARGUMENT") {
              setError("Invalid Wallet");
            } else if (error.code == "ACTION_REJECTED") {
              setError("Transaction Was Rejected");
            } else {
              setError("Error");
            }
            setTimeout(() => {
              setError();
            }, 2000);
          }
        }
      }
    }
    setLoader(false);
  };

  const handleConnectMetamaskClick = async () => {
    connectMetamask(updateContextState);
  };

  console.log("Change PiggyBank Type:", piggyBankType);
  console.log("Date End:", Date.parse(startDate) / 1000);

  return (
    <Layout>
      <h1 className="ml-36 mt-6 mb-6 text-4xl">Create your piggy bank!</h1>
      <form
        className="ml-6 mb-4 max-w-6xl rounded border-2 border-pink-300 bg-white px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleCreateSubmit}
      >
        <label className="block text-3xl text-pink-500" htmlFor="owner">
          Enter owner address:
        </label>
        <br />
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none"
          ref={ownerRef}
          name="owner"
          type="text"
          placeholder="enter owner address"
        />
        <br />
        <label className="mt-3 block text-3xl text-pink-500" htmlFor="desc">
          Enter description:
        </label>
        <br />
        <textarea
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none"
          ref={descRef}
          name="desc"
          type="text"
          placeholder="enter description"
        />
        <br />

        {/* добавил Select для изменения типа создаваемой копилки */}
        <div>
          <label htmlFor="countries" className="block text-3xl text-pink-500">
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
            <option value="approve">Approve Piggy Bank</option>
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
            <label
              className="mt-3 block text-3xl text-pink-500"
              htmlFor="amount"
            >
              Enter amount for Piggy (eth):
            </label>
            <br />
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none "
              ref={amountRef}
              name="amount"
              type="text"
              placeholder="enter amount on ETH"
            />
          </div>
        ) : piggyBankType === "endTime" ? (
          <div>
            <label className="block text-3xl text-pink-500" htmlFor="date">
              Enter end date in uts:
            </label>
            <br />
            <div className="focus:shadow-outline appearance-none rounded border py-4 px-6 font-bold leading-tight text-gray-500 shadow focus:outline-none">
              <DatePicker
                className="w-80 text-xl"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-3xl text-pink-500" htmlFor="approver">
              Enter Approver address:
            </label>
            <br />
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none"
              ref={approverRef}
              name="approver"
              type="text"
              placeholder="enter approver address"
            />
          </div>
        )}

        <br />
        {currentAccount ? (
          loader ? (
            <div className="ml-16" role="status">
              <svg
                aria-hidden="true"
                class="mr-2 h-16 w-16 animate-spin fill-pink-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              disabled={loader}
              className="rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl hover:bg-pink-300"
              type="submit"
            >
              Create
            </button>
          )
        ) : null}
      </form>

      {!currentAccount ? (
        <div className="flex justify-center">
          <button
            className="rounded-2xl border-2 border-pink-500 bg-pink-100 px-[18px] py-1 text-5xl font-semibold hover:bg-pink-300"
            onClick={handleConnectMetamaskClick}
          >
            Connect Metamask
          </button>
        </div>
      ) : null}

      <div className="flex justify-center">
        {error ? (
          <div
            className={
              error == "Transaction success"
                ? "аlex w-1/3 justify-center border bg-green-400 py-1 px-4 text-3xl font-bold text-green-800"
                : "flex w-1/3 justify-center border bg-red-400 py-1 px-4 text-3xl font-bold text-red-800"
            }
          >
            {error}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};
//wow
export default NewPiggyBankPage;
