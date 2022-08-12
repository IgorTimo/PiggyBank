import Link from "next/link";
import Layout from "../components/Layout";
const Index = () => {
  return (
    <Layout>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { address: "0x46F171D9F3F109b829606F11C7bB6c6E42245201" },
        }}
      >
        <a>
          Piggy bank with address 0x46F171D9F3F109b829606F11C7bB6c6E42245201
        </a>
      </Link>
      <br/>
      <Link
        href={{
          pathname: "/piggy_banks",
          query: { user: "some_user" },
        }}
      >
        <a>
          Piggy banks of user
        </a>
      </Link>
    </Layout>
  );
};

export default Index;
