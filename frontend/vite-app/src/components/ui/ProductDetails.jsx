import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useParams } from 'react-router';

export default function ProductDetails() {
  let params = useParams()
  const id = params.id
  
  const item = itemData.find((item)=> item.id == id)
  return (
    <Card sx={{ marginBottom: 15, marginTop:15 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="140"
          image={item.img}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
            <Typography gutterBottom variant="h5" component="b" ml={2}>
             ${item.price.toLocaleString()}
          </Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='contained' size="large" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    price: 6555500,
    id: 1,
    description: 'A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.A delicious breakfast to start your day with energy and joy.'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    price: 955,
    id: 2,
    description: 'A juicy burger with fresh ingredients and a perfect bun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    price: 677,
    id: 3,
    description: 'Capture your precious moments with this high-quality camera.'
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    price: 400,
    id: 4,
    description: 'A cup of freshly brewed coffee to kickstart your day.'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    price: 900,
    id: 5,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    price: 200,
    id: 6,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    price: 400,
    id: 7,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    price: 300,
    id: 8,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    price: 2300,
    id: 9,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    price: 780,
    id: 10,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    price: 2980,
    id: 11,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    price: 1940,
    id: 12,
    description: 'Stylish hats to complement your outfit and protect you from the sun.'
  },
];
