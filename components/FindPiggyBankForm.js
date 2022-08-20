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
    <form className="my-4" onSubmit={handleFindAddressSubmit}>
      <label className="text-2xl" htmlFor="address">
        Enter piggy bank address to find info
      </label>
      <br />
      <input
        className="w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
        ref={addressRef}
        name="address"
        type="text"
        placeholder="enter piggy bank address"
      />
      <button
        className="ml-2 rounded border border-orange-300 py-1 px-4 text-xl hover:bg-orange-300"
        type="submit"
      >
        Find
      </button>
    </form>
  );
};

export default FindPiggyBankForm;
