import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import { parseEther } from "ethers/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../../hooks/useAppContext";
import connectMetamask from "../../../utils/connectMetamask";
import ContractWithSigner from "../../../contracts/ContractWithSigner"
import AmountPiggyBankFactory from "../../../contracts/piggy_banks_factory/AmountPiggyBankFactory";
import ApprovePiggyBankFactory from "../../../contracts/piggy_banks_factory/ApprovePiggyBankFactory";
import TimePiggyBankFactory from "../../../contracts/piggy_banks_factory/TimePiggyBankFactory";
import Loader from "../../../components/Loader";

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
            const tx = await ContractWithSigner(
              AmountPiggyBankFactory
            ).createAmountPiggyBank(
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
            console.error(error);
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
            const tx = await ContractWithSigner(
              TimePiggyBankFactory
            ).createTimePiggyBank(
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
            const tx = await ContractWithSigner(
              ApprovePiggyBankFactory
            ).createApprovePiggyBank(
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
            <Loader />
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
