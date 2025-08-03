// src/Component/web3.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import toast from 'react-hot-toast';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within a Web3Provider');
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null); // Only for MetaMask
  const [chainId, setChainId] = useState(null); // Only for MetaMask
  const [walletType, setWalletType] = useState(null); // 'metamask' or 'phantom'
  const [isConnected, setIsConnected] = useState(false);

  // Auto-connect on mount (never triggers wallet popup)
  useEffect(() => {
    // MetaMask (silent)
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts && accounts.length > 0) {
            setProvider(new ethers.BrowserProvider(window.ethereum));
            setAccount(accounts[0]);
            setWalletType('metamask');
            setIsConnected(true);
          }
        });
    }
    // Phantom (silent)
    if (window.solana && window.solana.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(res => {
        if (res.publicKey) {
          setAccount(res.publicKey.toString());
          setWalletType('phantom');
          setIsConnected(true);
        }
      }).catch(() => {});
    }
  }, []);

  // User-initiated MetaMask connect (shows popup)
  const connectMetaMask = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      toast.error('MetaMask is not installed');
      return { success: false };
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      const signer = await providerInstance.getSigner();
      const address = await signer.getAddress();
      const network = await providerInstance.getNetwork();
      setProvider(providerInstance);
      setAccount(address);
      setChainId(network.chainId.toString());
      setWalletType('metamask');
      setIsConnected(true);
      toast.success('MetaMask connected!');
      return { success: true, address };
    } catch {
      toast.error('MetaMask connection cancelled or failed');
      return { success: false };
    }
  };

  // User-initiated Phantom connect (shows popup)
  const connectPhantom = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      toast.error('Phantom wallet is not installed');
      return { success: false };
    }
    try {
      const res = await window.solana.connect();
      setAccount(res.publicKey.toString());
      setWalletType('phantom');
      setIsConnected(true);
      toast.success('Phantom wallet connected!');
      return { success: true, address: res.publicKey.toString() };
    } catch {
      toast.error('Phantom connection cancelled or failed');
      return { success: false };
    }
  };

  // Wallet disconnect (Phantom only; MetaMask can't programmatically disconnect)
  const disconnect = async () => {
    if (walletType === 'phantom' && window.solana && window.solana.isPhantom) {
      try {
        await window.solana.disconnect();
      } catch {}
    }
    setAccount(null);
    setProvider(null);
    setChainId(null);
    setWalletType(null);
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };

  // Send Ethereum payment (MetaMask)
  const sendEthereumPayment = async (amount, toAddress) => {
    if (!provider || walletType !== 'metamask') {
      toast.error('MetaMask not connected');
      return { success: false };
    }
    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount.toString())
      });
      toast.success('Transaction sent! Waiting for confirmation...');
      const receipt = await tx.wait();
      return {
        success: true,
        hash: receipt.hash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      toast.error('Payment failed');
      return { success: false, error: error.message };
    }
  };

  // Send SOL payment (Phantom)
  const sendSolanaPayment = async (amount, toAddress) => {
    if (!window.solana || walletType !== 'phantom') {
      toast.error('Phantom wallet not connected');
      return { success: false };
    }
    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const fromPubkey = new PublicKey(account);
      const toPubkey = new PublicKey(toAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: Math.round(amount * 1e9)
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;
      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      toast.success('Transaction sent! Waiting for confirmation...');
      await connection.confirmTransaction(signature);
      return { success: true, hash: signature };
    } catch (error) {
      toast.error('Payment failed');
      return { success: false, error: error.message };
    }
  };

  const value = {
    account,
    provider,
    chainId,
    walletType,
    isConnected,
    connectMetaMask,
    connectPhantom,
    disconnect,
    sendEthereumPayment,
    sendSolanaPayment
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
