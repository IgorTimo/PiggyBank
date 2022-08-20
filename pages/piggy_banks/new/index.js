import { useRouter } from "next/router";
import { useRef } from "react";
import Layout from "../../../components/Layout";
import piggyBankFactoryWithSinger from "../../../contracts/piggy_banks_factory/piggyBankFactoryWithSinger";

const NewPiggyBankPage = () => {
  const router = useRouter();
  const ownerRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const tx = await piggyBankFactoryWithSinger().createTimePiggyBank(
        ownerRef.current.value,
        descRef.current.value,
        dateRef.current.value
      );
      console.log("tx: ", tx);
      const response = await tx.wait();
      console.log("response: ", response);
      router.push({
        pathname: "/piggy_banks",
        query: { user: ownerRef.current.value },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl">Create you piggy bank!</h1>
      <form className="my-4" onSubmit={handleCreateSubmit}>
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
          type="text"
          placeholder="enter date in uts"
        />
        <br />

        <button
          className="my-2 w-1/4 rounded border border-orange-300 py-1 px-4 text-xl hover:bg-orange-300"
          type="submit"
        >
          Create
        </button>
      </form>
    </Layout>
  );
};

export default NewPiggyBankPage;
