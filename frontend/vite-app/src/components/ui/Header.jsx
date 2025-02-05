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
import { useCart } from '../../store/cartStore';
import { useConnectedStore } from '../../store/connectedStore';


export default function Header() {
  const { web3, contract, account, connectWallet, disconnectWallet } = useWeb3();

  const cartItemsNum = useCart((state) => state.items.length)
  const connected = useConnectedStore((state)=> state.connected)


  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

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
          {connected && (
            <Badge badgeContent={cartItemsNum}>
              <IconButton
                  size="small"
                  edge="start"
                  aria-label="menu"
                  href='/cart'
              >
                  <ShoppingCart color='primary' />
              </IconButton>
            </Badge>
          )}
          
          
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
