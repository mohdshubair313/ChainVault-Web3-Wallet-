import * as bip39 from 'bip39';
import { HDNodeWallet } from 'ethers';
import { Keypair as SolanaKeypair } from '@solana/web3.js';

// Generate Seed Phrase
export const generateSeedPhrase = (): string => {
  return bip39.generateMnemonic();
};

// Derive Ethereum Keys
export const generateEthKeys = (seedPhrase: string) => {
  if (!bip39.validateMnemonic(seedPhrase)) {
    throw new Error('Invalid seed phrase');
  }
  const wallet = HDNodeWallet.fromMnemonic(seedPhrase);
  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.address,
  };
};

// Derive Solana Keys
export const generateSolanaKeys = (seedPhrase: string) => {
  if (!bip39.validateMnemonic(seedPhrase)) {
    throw new Error('Invalid seed phrase');
  }
  const seed = bip39.mnemonicToSeedSync(seedPhrase).slice(0, 32);
  const keypair = SolanaKeypair.fromSeed(Uint8Array.from(seed));
  return {
    privateKey: Buffer.from(keypair.secretKey).toString('hex'),
    publicKey: keypair.publicKey.toBase58(),
  };
};
