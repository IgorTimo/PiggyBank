import Link from "next/link";
import FindPiggyBankForm from "../components/FindPiggyBankForm";
import FindUsersPiggyBanksForm from "../components/FindUsersPiggyBanksForm";
import Layout from "../components/Layout";
const Index = () => {
  return (
    <Layout>

      <FindPiggyBankForm />
      <FindUsersPiggyBanksForm />
      <Link href="/piggy_banks/new">
      <a className="text-2xl text-blue-500 hover:text-blue-700">
        Or create your own piggy bank!
        </a>
      </Link>
    </Layout>
  );
};

export default Index;
