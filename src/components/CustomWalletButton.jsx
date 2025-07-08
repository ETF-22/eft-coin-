
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const CustomWalletButton = () => {
  const { publicKey, connect, disconnect, connected } = useWallet();
  const shortAddress = publicKey ? publicKey.toBase58().slice(0, 4) + '...' + publicKey.toBase58().slice(-4) : '';
  return (
    <button className="claim-top-btn" onClick={connected ? disconnect : connect} style={{ marginRight: '10px' }}>
      {connected ? `Connected: ${shortAddress}` : 'Connect Wallet'}
    </button>
  );
};

export default CustomWalletButton;
