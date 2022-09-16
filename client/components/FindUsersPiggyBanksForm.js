import { useRouter } from "next/router";
import { useRef } from "react";

const FindUsersPiggyBanksForm = () => {
  const router = useRouter();
  const userRef = useRef();

  const handleFindUserSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/piggy_banks",
      query: { user: userRef.current.value },
    });
  };

  return (
    <form className="items-center justify-items-center bg-white shadow-xl px-8 pt-6 pb-8 mb-16 border-2 border-t-0 border-pink-300" onSubmit={handleFindUserSubmit}>
      <label className="text-2xl" htmlFor="user">
        Enter user address to find info about his piggy banks:
      </label>
      <br />
      <input
        className="w-1/2 rounded border border-pink-300 bg-pink-100 mt-4 py-1 px-4 text-xl"
        ref={userRef}
        name="user"
        type="text"
        placeholder="Enter user address"
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

export default FindUsersPiggyBanksForm;
