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
    <form className="my-4" onSubmit={handleFindUserSubmit}>
      <label className="text-2xl" htmlFor="user">
        Enter user address to find info about his piggy banks
      </label>
      <br />
      <input
        className="w-1/2 rounded border border-orange-300 py-1 px-4 text-xl "
        ref={userRef}
        name="user"
        type="text"
        placeholder="enter user address"
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

export default FindUsersPiggyBanksForm;
