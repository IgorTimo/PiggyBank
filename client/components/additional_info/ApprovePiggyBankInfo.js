import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ApprovePiggyBank from "../../contracts/additional_piggy_banks/ApprovePiggyBank";
import ContractWithSinger from "../../contracts/ContractWithSigner";
import { useAppContext } from "../../hooks/useAppContext";
import getErrorMessage from "../../utils/getErrorMessage";
import ErrorView from "../ErrorView";
import Loader from "../Loader";

const ApprovePiggyBankInfo = ({ address }) => {
  const [approver, setApprover] = useState("");
  const [isApproved, setApproved] = useState(false);
  const [error, setError] = useState();
  const [isPending, setPending] = useState(false);
  const { contextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const router = useRouter();

  const approvePiggyBank = ApprovePiggyBank(address);
  const approvePiggyBankWithSigner = ContractWithSinger(approvePiggyBank);

  useEffect(() => {
    (async () => {
      try {
        setApprover(await approvePiggyBank.approver());
        setApproved(await approvePiggyBank.isApproved());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleApproveClick = async () => {
    setPending(true);
    setError("")
    try {
      const tx = await approvePiggyBankWithSigner.setApproved();
      await tx.wait();
      router.reload();
    } catch (error) {
      const message = getErrorMessage(error.code);
      setError(message);
      setTimeout(() => {
        setError("");
      }, 2000);
      console.error(message);
    } finally {
      setPending(false);
    }
  };

  if (isPending) return <Loader />;

  return (
    <>
      <h2 className="text-2xl">Approver: {approver}</h2>
      {isApproved ? (
        <h2 className="text-2xl">Approved</h2>
      ) : (
        currentAccount === approver.toLowerCase() && (
          <button
            onClick={handleApproveClick}
            className={`my-2 rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl  hover:bg-pink-300`}
          >
            Approve
          </button>
        )
      )}
      {error && <ErrorView error={error} />}
    </>
  );
};

export default ApprovePiggyBankInfo;
