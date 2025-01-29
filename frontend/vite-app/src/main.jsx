import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConnectWallet } from './components/connectWallet'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router'
import Footer from './components/ui/Footer.jsx'
import Header from './components/ui/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectWallet>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/cart" element={<Cart />} />
          <Route path="products">
            <Route index element={<AllProducts />} />
            <Route path=":id" element={<ProductDetails />} />
            <Route path="popular" element={<Popular />} />
          </Route>

          <Route path="seller">
            <Route index element={<AllProducts />} />
            <Route path=":id" element={<ProductDetails />} />
            <Route path="list" element={<ListProducts />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      <Footer/>
    </ConnectWallet>
  </StrictMode>,
)
