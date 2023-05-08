import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PrivyProvider } from '@privy-io/react-auth';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains } from 'wagmi';
import { optimismGoerli, polygon } from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
 
const configureChainsConfig = configureChains(
  [
    polygon,
    optimismGoerli
  ],
  [
    alchemyProvider({
      apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider appId='cldom121l0000mq08moy30qbl'>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <ToastContainer />
        <Analytics />
        <Navbar />
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}

export default MyApp;
