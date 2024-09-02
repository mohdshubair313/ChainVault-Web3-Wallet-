import * as bip39 from 'bip39';
import { HDNodeWallet } from 'ethers';
import { Keypair as SolanaKeypair } from '@solana/web3.js';

// Generate Seed Phrase
export const generateSeedPhrase = (): string => {
  return bip39.generateMnemonic();
};

// Derive Ethereum Keys
export const generateEthKeys = (seedPhrase: any) => {
  const wallet = HDNodeWallet.fromMnemonic(seedPhrase);
  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.address,
  };
};

// Derive Solana Keys
export const generateSolanaKeys = (seedPhrase: string) => {
  const seed = bip39.mnemonicToSeedSync(seedPhrase).slice(0, 32);
  const keypair = SolanaKeypair.fromSeed(seed);
  return {
    privateKey: Buffer.from(keypair.secretKey).toString('hex'),
    publicKey: keypair.publicKey.toString(),
  };
};


