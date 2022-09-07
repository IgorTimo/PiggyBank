import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "../components/Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <Head>
          <link rel="shortcut icon" href="favicon-32x32.png" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
