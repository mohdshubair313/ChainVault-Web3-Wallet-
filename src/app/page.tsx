"use client";  // Add this directive at the very top

import Image from "next/image";
import { useState } from 'react';
import { generateSeedPhrase, generateEthKeys, generateSolanaKeys, generateBitcoinKeys } from './utils/crypto';

const Home = () => {
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const [blockchain, setBlockchain] = useState<'ethereum' | 'solana' | 'bitcoin'>('ethereum');
  const [keys, setKeys] = useState<{ publicKey: string; privateKey: string } | null>(null);

  const handleGenerateSeed = () => {
    const newSeed = generateSeedPhrase();
    setSeedPhrase(newSeed);
    setKeys(null);  // Reset keys when a new seed phrase is generated
  };

  const handleGenerateKeys = () => {
    if (!seedPhrase) return;
    if (blockchain === 'ethereum') setKeys(generateEthKeys(seedPhrase));
    if (blockchain === 'solana') setKeys(generateSolanaKeys(seedPhrase));
    if (blockchain === 'bitcoin') setKeys(generateBitcoinKeys(seedPhrase));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Web3 Wallet</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={handleGenerateSeed}
      >
        Generate Seed Phrase
      </button>

      {seedPhrase && (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <p className="mb-4 font-semibold">Seed Phrase:</p>
          <p className="text-sm font-mono">{seedPhrase}</p>
          <div className="mt-4">
            <label className="block mb-2 font-semibold">Choose Blockchain:</label>
            <select
              className="border rounded p-2 w-full"
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value as 'ethereum' | 'solana' | 'bitcoin')}
            >
              <option value="ethereum">Ethereum</option>
              <option value="solana">Solana</option>
              <option value="bitcoin">Bitcoin</option>
            </select>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow"
              onClick={handleGenerateKeys}
            >
              Generate {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)} Keys
            </button>
          </div>
        </div>
      )}

      {keys && (
        <div className="mt-6 p-4 bg-white rounded shadow-md">
          <p className="mb-2 font-semibold">Public Key:</p>
          <p className="text-sm font-mono">{keys.publicKey}</p>
          <p className="mt-4 font-semibold">Private Key:</p>
          <p className="text-sm font-mono">{keys.privateKey}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
