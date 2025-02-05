import React from "react";
import { useWeb3 } from "../connectWallet";
import "./style.css";
import { useConnectedStore } from "../../store/connectedStore";
 
export const HomePage = () => {
	const { web3, contract, account, connectWallet, disconnectWallet } = useWeb3();
	const connected = useConnectedStore((state)=> state.connected)

  return (
    <div id="webcrumbs"> 
        <div className="w-full bg-white mx-auto px-4 md:px-0">
    	  <nav className="flex items-center justify-between p-4 md:p-6 border-b">
    	    <div className="flex items-center">
    	      <h1 className="text-xl md:text-2xl font-bold">Ahia Onchain</h1>
    	    </div>
			{connected? (
				<button onClick={()=> disconnectWallet()} className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
				Disconnect Wallet
				</button>
			) : (
				<button onClick={()=> connectWallet()} className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
				Connect Wallet
				</button>
			)}
    	    
    	  </nav>
    	
    	  <header className="py-12 md:py-20 text-center px-4">
    	    <h1 className="text-3xl md:text-5xl font-bold mb-6">Revolutionizing E-commerce with Web3</h1>
    	    <p className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">Experience the future of online shopping with blockchain technology, secure transactions, and decentralized commerce.</p>
    	    {connected? (
			<a className="w-full md:w-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 md:px-8 py-3 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all" href="/products">Start Shopping Now</a>
			) : (
				<h1 className="text-3xl md:text-5xl font-bold mb-6">Connect Wallet to Start Shopping</h1>
			)}
    	  </header>
    	
    	  <section className="py-12 md:py-16 bg-neutral-50">
    	    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-10">
    	      <div className="p-6 bg-white rounded-xl hover:shadow-xl transition-shadow">
    	        <span className="material-symbols-outlined text-3xl md:text-4xl mb-4">security</span>
    	        <h3 className="text-lg md:text-xl font-semibold mb-3">Secure Transactions</h3>
    	        <p>All transactions are secured by blockchain technology and smart contracts.</p>
    	      </div>
    	      <div className="p-6 bg-white rounded-xl hover:shadow-xl transition-shadow">
    	        <span className="material-symbols-outlined text-3xl md:text-4xl mb-4">wallet</span>
    	        <h3 className="text-lg md:text-xl font-semibold mb-3">Multiple Wallets</h3>
    	        <p>Connect with MetaMask, WalletConnect, or other popular crypto wallets.</p>
    	      </div>
    	      <div className="p-6 bg-white rounded-xl hover:shadow-xl transition-shadow">
    	        <span className="material-symbols-outlined text-3xl md:text-4xl mb-4">token</span>
    	        <h3 className="text-lg md:text-xl font-semibold mb-3">Token Rewards</h3>
    	        <p>Earn tokens for your purchases and participate in platform governance.</p>
    	      </div>
    	    </div>
    	  </section>
    	
    	  <section className="py-12 md:py-16">
    	    <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-10 space-y-8 md:space-y-0">
    	      <div className="w-full md:w-1/2">
    	        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Web3 Shopping?</h2>
    	        <div className="space-y-4">
    	          <details className="bg-neutral-50 p-4 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
    	            <summary className="font-semibold">Decentralized Platform</summary>
    	            <p className="mt-2">Shop without intermediaries and enjoy true peer-to-peer commerce.</p>
    	          </details>
    	          <details className="bg-neutral-50 p-4 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
    	            <summary className="font-semibold">Transparent Pricing</summary>
    	            <p className="mt-2">All transactions and fees are visible on the blockchain.</p>
    	          </details>
    	          <details className="bg-neutral-50 p-4 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
    	            <summary className="font-semibold">Community Driven</summary>
    	            <p className="mt-2">Participate in governance and shape the future of the platform.</p>
    	          </details>
    	        </div>
    	      </div>
    	      <div className="w-full md:w-1/2 md:pl-20">
    	        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-1 rounded-2xl">
    	          <div className="bg-white p-6 md:p-8 rounded-2xl">
    	            <h3 className="text-xl md:text-2xl font-bold mb-6">Supported Wallets</h3>
    	            <div className="grid grid-cols-2 gap-4">
    	              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors">
    	                <i className="fa-brands fa-ethereum text-2xl md:text-3xl"></i>
    	                <span className="text-sm md:text-base">MetaMask</span>
    	              </div>
    	              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors">
    	                <span className="material-symbols-outlined text-2xl md:text-3xl">link</span>
    	                <span className="text-sm md:text-base">WalletConnect</span>
    	              </div>
    	              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors">
    	                <span className="material-symbols-outlined text-2xl md:text-3xl">account_balance_wallet</span>
    	                <span className="text-sm md:text-base">Coinbase</span>
    	              </div>
    	              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors">
    	                <span className="material-symbols-outlined text-2xl md:text-3xl">token</span>
    	                <span className="text-sm md:text-base">Trust Wallet</span>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </div>
    	    </div>
    	  </section>
    	
    	  <section id="contact" className="py-12 md:py-16 bg-neutral-50">
    	    <div className="max-w-4xl mx-auto px-4">
    	      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Contact Us</h2>
    	      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    	        <div className="p-6 bg-white rounded-xl hover:shadow-xl transition-shadow">
    	          <span className="material-symbols-outlined text-3xl md:text-4xl mb-4">mail</span>
    	          <h3 className="text-lg md:text-xl font-semibold mb-3">Email</h3>
    	          <a href="mailto:contact@ahiaonchain.com" className="hover:underline">contact@ahiaonchain.com</a>
    	        </div>
    	        <div className="p-6 bg-white rounded-xl hover:shadow-xl transition-shadow">
    	          <span className="material-symbols-outlined text-3xl md:text-4xl mb-4">phone</span>
    	          <h3 className="text-lg md:text-xl font-semibold mb-3">Phone</h3>
    	          <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
    	        </div>
    	      </div>
    	    </div>
    	  </section>
    	
    	  <footer className="py-6 border-t">
    	    <div className="text-center">
    	      <p className="text-sm">&copy; {2024} Ahia Onchain. All rights reserved.</p>
    	    </div>
    	  </footer>
    	</div> 
    </div>
  )
}

