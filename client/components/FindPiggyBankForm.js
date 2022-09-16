import { useRouter } from "next/router";
import { useRef } from "react";

const FindPiggyBankForm = () => {
  const router = useRouter();
  const addressRef = useRef();

  const handleFindAddressSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/piggy_banks",
      query: { address: addressRef.current.value },
    });
  };

  return (
    <form className="items-center justify-center bg-white shadow-xl px-8 pt-6 pb-8 mt-64 border-2 border-b-0 border-pink-300" onSubmit={handleFindAddressSubmit}>
      <label className="text-2xl" htmlFor="address">
        Enter piggy bank address to find info:
      </label>
      <br />
      <input
        className="w-1/2 rounded border border-pink-300 bg-pink-100 mt-4 py-1 px-4 text-xl"
        ref={addressRef}
        name="address"
        type="text"
        placeholder="Enter piggy bank address"
      />
      <button
        className="ml-2 rounded border bg-pink-100 border-pink-300 py-1 px-4 text-xl hover:bg-pink-300"
        type="submit"
      >
        Find
      </button>
    </form>
  );
};

export default FindPiggyBankForm;
