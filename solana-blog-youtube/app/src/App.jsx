import { useMemo } from "react";
import { BlogProvider } from "src/context/Blog";
import { Router } from "src/router";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "./App.css";

export const App = () => {
  const endpoint =
    "https://stylish-yolo-friday.solana-devnet.discover.quiknode.pro/f8c26a38c38f3c79fbe16272c90ab7996a1e2435/";
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <BlogProvider>
          <Router />
        </BlogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
