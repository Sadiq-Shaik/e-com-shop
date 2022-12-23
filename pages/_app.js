import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { ShoppingCartProvider } from "../context/shoppingCartContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ShoppingCartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShoppingCartProvider>
    </SessionProvider>
  );
}

export default MyApp;
