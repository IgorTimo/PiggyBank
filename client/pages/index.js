import Link from "next/link";
import FindPiggyBankForm from "../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../components/FindUsersPiggyBanksForm";
import Layout from "../components/Layout";
import Head from "next/head";

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>Piggy Bank</title>
      </Head>

      <FindPiggyBankForm />
      <FindUsersPiggyBanksForm />
      <Link href="/piggy_banks/new">
        <a className="mt-16 grid justify-center rounded-xl border border-pink-300 bg-pink-100 py-1 px-4 text-center text-2xl hover:bg-pink-300">
          Or create your own piggy bank!
        </a>
      </Link>
    </Layout>
  );
};

export default Index;
