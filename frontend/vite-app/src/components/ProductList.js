// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import web3 from '../web3';
import contract from '../contract';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const productCount = await contract.methods.productCount().call();
      const productArray = [];

      for (let i = 1; i <= productCount; i++) {
        const product = await contract.methods.getProduct(i).call();
        productArray.push(product);
      }

      setProducts(productArray);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <p>Price: {web3.utils.fromWei(product.price, 'ether')} ETH</p>
            <p>Seller: {product.seller}</p>
            <p>Status: {product.isSold ? 'Sold' : 'Available'}</p>
            <p>Buyer: {product.buyer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;