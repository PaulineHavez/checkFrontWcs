import "@/styles/globals.css";
import "@/output.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/apollo-client";
export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
