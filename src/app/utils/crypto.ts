import * as bip39 from 'bip39';
import { HDNodeWallet } from 'ethers';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import * as bitcoin from 'bitcoinjs-lib';
import { mnemonicToSeedSync } from 'bip39';

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

// Derive Bitcoin Keys
export const generateBitcoinKeys = (seedPhrase: string) => {
  const seed = mnemonicToSeedSync(seedPhrase);
  const root = bitcoin.BIP32API.fromSeed(seed);  // Correct use of bip32
  const keypair = root.derivePath("m/44'/0'/0'/0/0");
  return {
    privateKey: keypair.toWIF(),
    publicKey: bitcoin.payments.p2pkh({ pubkey: keypair.publicKey }).address!,
  };
};
