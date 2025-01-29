import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import { Box, Container, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState({});
  

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>

        
      </Container>

      {/* ...... */}
      <div className="App">
        <div className="top-right-buttons">
          
        </div>
        <div className="content-container">
          {/* {loading ? (
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
          )} */}
        </div>
      </div>
    </>
  )
}

export default App
