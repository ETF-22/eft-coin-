
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useMemo } from 'react';

const USDT_MINT = new PublicKey('Es9vMFrzaCERFpcd9bQ8jHbGPFNnSmjrDBrGoT8itY9w');
const RECEIVER_WALLET = new PublicKey('Bi3ZAa98B3Z8gzmhQxrGHLdvGwe7Bw2fUCPqid3rjZNm');

export default function BuyButton({ amount }) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleBuy = async () => {
    if (!publicKey) {
      alert('Please connect your wallet.');
      return;
    }

    if (amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      const ix = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: RECEIVER_WALLET,
        lamports: amount * 1e6,  // USDT has 6 decimals
      });

      const tx = new Transaction().add(ix);
      const signature = await sendTransaction(tx, connection);
      alert('Transaction sent! Signature: ' + signature);
    } catch (error) {
      alert('Transaction failed: ' + error.message);
    }
  };

  return (
    <button className="w-full p-3 bg-green-600 hover:bg-green-700 rounded text-white text-lg" onClick={handleBuy}>
      Buy with USDT
    </button>
  );
}
