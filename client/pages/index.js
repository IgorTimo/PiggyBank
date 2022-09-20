import Link from "next/link";
import { useEffect } from "react";
import FindPiggyBankForm from "../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../components/FindUsersPiggyBanksForm";
import Layout from "../components/Layout";

const Index = () => {
  useEffect(() => {
    document.title = "Home";
  });
  return (
    <Layout>

      <FindPiggyBankForm />
      <FindUsersPiggyBanksForm />
      <Link href="/piggy_banks/new">
      <a className="grid justify-center text-center rounded-xl border bg-pink-100 border-pink-300 py-1 px-4 text-2xl hover:bg-pink-300 mt-16">
        Or create your own piggy bank!
      </a>
      </Link>
    </Layout>
  );
};

export default Index;
