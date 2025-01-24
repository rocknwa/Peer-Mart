import React, { useEffect, useState, createContext, useContext } from 'react';
import Web3 from 'web3'
import ECommerce from '../ECommerce.json';

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

export function ConnectWallet({ children }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const contractAddress = '0x356edA5558641C70E39fA4920B63d88Bcc12b1C2'; 

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      if (currentChainId !== '0x106a') { // Ensure this matches the Core testnet chain ID
        alert("Connect lisk testnet");
        return;
      }
      const instance = new web3.eth.Contract(ECommerce.abi, contractAddress);
      setContract(instance);
      console.log(account);
      setAccount(account);
      setConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setConnected(false);
    setContract(null);
  };

  

  return (
    <Web3Context.Provider value={{ web3, account, disconnectWallet, connectWallet, connected, contract }}>
      <div>
        {children}
      </div>
    </Web3Context.Provider>
  );
}