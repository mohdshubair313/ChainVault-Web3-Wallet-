"use client";

import Image from "next/image";
import { useState } from "react";
import {
  generateSeedPhrase,
  generateEthKeys,
  generateSolanaKeys,
} from "./utils/crypto";
import { motion } from "framer-motion";

const Home = () => {
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const [blockchain, setBlockchain] = useState<
    "ethereum" | "solana" | "bitcoin"
  >("ethereum");
  const [keys, setKeys] = useState<{ publicKey: string; privateKey: string } | null>(null);

  const handleGenerateSeed = () => {
    const newSeed = generateSeedPhrase();
    setSeedPhrase(newSeed);
    setKeys(null);
  };

  const handleGenerateKeys = () => {
    if (!seedPhrase) return;
    if (blockchain === "ethereum") setKeys(generateEthKeys(seedPhrase));
    if (blockchain === "solana") setKeys(generateSolanaKeys(seedPhrase));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 text-white">
      <motion.h1
        className="text-4xl font-bold mb-6 text-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Web3 Wallet
      </motion.h1>
      <motion.button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-all"
        onClick={handleGenerateSeed}
        whileHover={{ scale: 1.05 }}
      >
        Generate Seed Phrase
      </motion.button>

      {seedPhrase && (
        <motion.div
          className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="mb-4 text-lg font-semibold text-green-400">Seed Phrase:</p>
          <p className="text-md font-mono bg-gray-700 p-2 rounded-lg">{seedPhrase}</p>
          <div className="mt-6">
            <label className="block mb-2 text-lg font-semibold">Choose Blockchain:</label>
            <select
              className="border border-gray-600 bg-gray-900 text-white rounded p-2 w-full"
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value as "ethereum" | "solana" | "bitcoin")}
            >
              <option value="ethereum">Ethereum</option>
              <option value="solana">Solana</option>
              <option value="bitcoin">Bitcoin</option>
            </select>
            <motion.button
              className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all"
              onClick={handleGenerateKeys}
              whileHover={{ scale: 1.05 }}
            >
              Generate {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)} Keys
            </motion.button>
          </div>
        </motion.div>
      )}

      {keys && (
        <motion.div
          className="mt-6 p-6 bg-gray-800 rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="mb-2 text-lg font-semibold text-yellow-400">Public Key:</p>
          <p className="text-md font-mono bg-gray-700 p-2 rounded-lg break-all">{keys.publicKey}</p>
          <p className="mt-4 text-lg font-semibold text-red-400">Private Key:</p>
          <p className="text-md font-mono bg-gray-700 p-2 rounded-lg break-all">{keys.privateKey}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
