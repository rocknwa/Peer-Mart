import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router';

export default function ProductsList() {
  return (
    <ImageList cols={2} gap={30} style={{marginTop: 60, marginBottom: 60}}>
      {itemData.map((item) => (
        <Link to={`${item.id}`}>
            <ImageListItem key={item.img}>
                <img
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.title}
                    subtitle={<span style={{color: '#eee'}}>${item.price}</span>}
                    position="below"
                />
            </ImageListItem>
        </Link>
        
      ))}
    </ImageList>
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
