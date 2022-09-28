import Layout from "../../../components/Layout";

import Head from "next/head";
import ParentForm from "../../../components/create_forms/ParentForm";

const NewPiggyBankPage = () => {
  return (
    <Layout>
      <Head>
        <title>Create Piggy Bank</title>
      </Head>
      <h1 className="ml-36 mt-6 mb-6 text-4xl">Create your piggy bank!</h1>
      <ParentForm />
    </Layout>
  );
};
export default NewPiggyBankPage;
