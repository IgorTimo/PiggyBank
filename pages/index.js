import Link from "next/link";
import Layout from "../components/Layout";
const Index = () => {
  return (
    <Layout>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { address: "0x38c06676a6F46C97de7117d58CC08abDFb7eb7F8" },
        }}
      >
        <a>
          Piggy bank with address 0x38c06676a6F46C97de7117d58CC08abDFb7eb7F8
        </a>
      </Link>
    </Layout>
  );
};

export default Index;
