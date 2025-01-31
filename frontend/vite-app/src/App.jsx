import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import { Box, Container, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ProductsList from './components/ui/ProductsList';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

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
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState({});
   

  return (
    <>
      <Header/>
      <Container maxWidth="xl">
        <ProductsList />
      </Container>
      <Footer/>
    </>
  )
}

export default App
