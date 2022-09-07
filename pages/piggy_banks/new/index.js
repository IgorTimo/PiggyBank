import { useRouter } from "next/router";
import { useRef } from "react";
import Layout from "../../../components/Layout";
import { AMMOUNT_PIGGY_BANK, APPROVE_PIGGY_BANK, TIME_PIGGY_BANK } from "../../../contracts/ContractTypes/ContractTypes";
import piggyBankFactoryWithSinger from "../../../contracts/piggy_banks_factory/piggyBankFactoryWithSinger";

const NewPiggyBankPage = () => {
  const router = useRouter();
  const ownerRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const typeRef = useRef();
  const ammountRef = useRef();

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const date = dateRef.current.value.split("-");
      const ms = Date.UTC(date[0], date[1], date[2]);
      const type = typeRef.current.value;
      
      if (type === TIME_PIGGY_BANK) {
        const tx = await piggyBankFactoryWithSinger().createTimePiggyBank(
          ownerRef.current.value,
          descRef.current.value,
          ms
        );
        console.log("tx: ", tx);
        const response = await tx.wait();
        console.log("response: ", response);
        router.push({
          pathname: "/piggy_banks",
          query: { user: ownerRef.current.value },
        });
      } else if (type === AMMOUNT_PIGGY_BANK) {
        const tx = await piggyBankFactoryWithSinger().createAmmountPiggyBank(
          ownerRef.current.value,
          descRef.current.value,
          ammountRef.current.value.toString(16)
        );
        console.log("tx: ", tx);
        const response = await tx.wait();
        console.log("response: ", response);
        router.push({
          pathname: "/piggy_banks",
          query: { user: ownerRef.current.value },
        });
      } else {
        return
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl">Create you piggy bank!</h1>
      <form className="my-4" onSubmit={handleCreateSubmit}>
        <label className="text-2xl" htmlFor="cars">Choose a contract type:</label>
        <br />
        <select ref={typeRef} className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl" name="type" id="type">
          <option value={TIME_PIGGY_BANK}>Time Piggy Bank</option>
          <option value={AMMOUNT_PIGGY_BANK}>Ammount Piggy Bank</option>
          <option value={APPROVE_PIGGY_BANK}>Approve Piggy Bank</option>
        </select>
        <br />
        <label className="text-2xl" htmlFor="owner">
          Enter owner address:
        </label>
        <br />
        <input
          className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
          ref={ownerRef}
          name="owner"
          type="text"
          placeholder="enter owner address"
        />
        <br />
        <label className="text-2xl" htmlFor="desc">
          Enter description:
        </label>
        <br />
        <textarea
          className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
          ref={descRef}
          name="desc"
          type="text"
          placeholder="enter description"
        />
        <br />
        <label className="text-2xl" htmlFor="date">
          Enter end date in uts:
        </label>
        <br />
        <input
          className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
          ref={dateRef}
          name="date"
          type="date"
          placeholder="enter date in uts"
        />
        <br />
        <label className="text-2xl" htmlFor="date">
          Enter target ammount:
        </label>
        <br />
        <input
          className="my-2 w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
          ref={ammountRef}
          name="ammount"
          type="number"
          placeholder="enter target ammount"
        />
        <br />
        <button
          className="my-2 w-1/4 rounded border border-orange-300 py-1 px-4 text-xl hover:bg-orange-300"
          type="submit"
        >
          Create
        </button>
      </form>
    </Layout >
  );
};

export default NewPiggyBankPage;
