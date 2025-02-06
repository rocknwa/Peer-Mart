import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useCart } from '../../store/cartStore';

// function generate(element) {
//   return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Cart() {
  const items = useCart((state) => state.items)
  const resetCart = useCart((state) => state.resetCart)
  const removeProduct = useCart((state) => state.removeProduct)
  let prices = 0;

  function createOrder() {
    // Order Logic

    alert("Order Successful")
    resetCart()
  }

  const onCheckout = async () => {
    // Send Order to Blockchain
    createOrder()
    // createOrderMutation.mutate()
  }

  if (items.length === 0) {
    window.location.href = "/products"
  }

  return (
    <>
      <Header/><br /><br />
      <Box style={{margin: 'auto'}} sx={{ flexGrow: 1, width: '500px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} style={{paddingBottom: 30, paddingTop: 30}}>
            {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Avatar with text and icon
            </Typography> */}
            <Demo style={{paddingBottom: 30, paddingTop: 30}}>
              <List dense={false}>
                  {items.map((item)=> {
                      prices+= item.product.price
                      return (
                          <ListItem
                          key={item.product.id}
                              secondaryAction={<IconButton onClick={() => removeProduct(item.product) } edge="end" aria-label="delete">
                                  <DeleteIcon />
                              </IconButton>}
                          >
                              <ListItemAvatar>
                                  <Avatar>
                                      <img src={item.product.img} style={{ width: '100%' }} alt="" />
                                  </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                  //   primary="Single-line item.product"
                                  secondary={item.product.title} />

                              <ListItemText
                                  //   primary="Single-line item.product"
                                  secondary={`$${item.product.price.toLocaleString()}`} />

                          </ListItem>
                      );
                  })}
                
              </List>

              <Typography variant="b" component="h2" display={'inherit'} color='info' mb={5}>
                  Total: ${prices.toLocaleString()}
              </Typography>



              <Button onClick={onCheckout} variant="contained" color="error">Authorize Purcase</Button>
            </Demo>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </>
    
  );
}

  