import React, { useEffect, useState, createContext, useContext } from 'react';
import Web3 from 'web3'
import ECommerce from '../ECommerce.json';
import { useConnectedStore } from '../store/connectedStore';

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

export function ConnectWallet({ children }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  // const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState(null);

  const setConnected = useConnectedStore((state) => state.setConnected)
  const setDisconnected = useConnectedStore((state) => state.setDisconnected)

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const contractAddress = '0x543F4D587EBE758470b461d3adC0954C6c71f111'; 

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
      setConnected()
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    // web3.currentProvider?.disconnect()
    setAccount(null);
    setDisconnected()
    setContract(null);
  };

  

  return (
    <Web3Context.Provider value={{ web3, account, disconnectWallet, connectWallet, contract }}>
      <div>
        {children}
      </div>
    </Web3Context.Provider>
  );
}
