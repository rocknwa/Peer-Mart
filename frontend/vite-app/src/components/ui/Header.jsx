import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useWeb3 } from "../connectWallet";
import { useEffect } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';


export default function Header() {
  const { web3, contract, account, connectWallet, disconnectWallet, connected } = useWeb3();


  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='inherit'>
        <Toolbar>
          <Badge badgeContent={7}>
            <IconButton
                size="small"
                edge="start"
                aria-label="menu"
                href='/cart'
            >
                <ShoppingCart color='primary' />
            </IconButton>
          </Badge>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ahia Onchain
          </Typography>

          {connected ? (
            <Button onClick={handleDisconnect} variant="contained">Disconnect</Button>
          ) : (
            <Button onClick={handleConnect} variant="contained">Connect Wallet</Button>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
