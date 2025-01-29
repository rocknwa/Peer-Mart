import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useWeb3 } from "./components/connectWallet";
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0)

  const { web3, contract, account, connectWallet, disconnectWallet, connected } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (connected) {
      fetchProducts();
    }
  }, [connected]);

  const fetchProducts = async () => {
    setLoading(true);
    const productCount = await contract.methods.productCount().call();
    const productArray = [];
    const sellerDetails = {};

    for (let i = 1; i <= productCount; i++) {
      const product = await contract.methods.getProduct(i).call();
      productArray.push(product);

      if (!sellerDetails[product.seller]) {
        const seller = await contract.methods.sellers(product.seller).call();
        sellerDetails[product.seller] = seller;
      }
    }

    setProducts(productArray);
    setSellers(sellerDetails);
    setLoading(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const handleConnect = () => {
    connectWallet();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* .... */}
      <div className="App">
        <div className="top-right-buttons">
          {connected ? (
            <button onClick={handleDisconnect}>Disconnect</button>
          ) : (
            <button onClick={handleConnect}>Connect</button>
          )}
        </div>
        <div className="content-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="products-container">
              <h1>Available Products</h1>
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '200px', height: '200px' }} />
                    <p>Price: {web3.utils.toWei(product.price, 'wei')} USDT</p>
                    <p>Status: {product.isSold ? 'Sold' : 'Available'}</p>
                    <p>Buyer: {product.buyer}</p>
                    {sellers[product.seller] && (
                      <div className="seller-details">
                        <h3>Seller Details</h3>
                        <img src={sellers[product.seller].profileURI} alt={sellers[product.seller].name} style={{ width: '100px', height: '100px' }} />
                        <p>Name: {sellers[product.seller].name}</p>
                        <p>Confirmed Purchases: {sellers[product.seller].confirmedPurchases}</p>
                        <p>Canceled Purchases: {sellers[product.seller].canceledPurchases}</p>
                        <p>Reported Purchases: {sellers[product.seller].reportedPurchases}</p>
                        <p>Rating: {sellers[product.seller].rating}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
