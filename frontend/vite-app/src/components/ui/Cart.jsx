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


function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Cart() {

  let prices = 0;

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
                  {itemData.map((item)=> {
                      prices+= item.price
                      return (
                          <ListItem
                              secondaryAction={<IconButton onClick={() => { alert('Clicked'); } } edge="end" aria-label="delete">
                                  <DeleteIcon />
                              </IconButton>}
                          >
                              <ListItemAvatar>
                                  <Avatar>
                                      <img src={item.img} style={{ width: '100%' }} alt="" />
                                  </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                  //   primary="Single-line item"
                                  secondary={item.title} />

                              <ListItemText
                                  //   primary="Single-line item"
                                  secondary={`$${item.price.toLocaleString()}`} />

                          </ListItem>
                      );
                  })}
                
              </List>

              <Typography variant="b" component="h2" display={'inherit'} color='info' mb={5}>
                  Total: ${prices.toLocaleString()}
              </Typography>



              <Button onClick={()=> alert(prices)} variant="contained" color="error">Authorize Purcase</Button>
            </Demo>
          </Grid>
        </Grid>
      </Box>
      <Footer/>
    </>
    
  );
}

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      price: 500,
      id: 1,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      price: 955,
      id: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      price: 677,
      id: 3,
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      price: 400,
      id: 4,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      price: 900,
      id: 5,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      price: 200,
      id: 6,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      price: 400,
      id: 7,
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      price: 300,
      id: 8,
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      price: 2300,
      id: 9,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      price: 780,
      id: 10,
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      price: 2980,
      id: 11,
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      price: 1940,
      id: 12,
    },
  ];
  