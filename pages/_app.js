import Head from "next/head";
import { AppContextProvider } from "../contexts/AppContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
      <AppContextProvider>
        <Head>
          <link rel="shortcut icon" href="favicon-32x32.png" />
        </Head>
        <Component {...pageProps} />
      </AppContextProvider>
  );
}

export default MyApp;