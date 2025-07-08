
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import './style.css';

const endpoint = "https://api.mainnet-beta.solana.com";
const wallets = [new PhantomWalletAdapter()];

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <AppRouter />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);
