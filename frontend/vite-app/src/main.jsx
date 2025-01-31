import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { ConnectWallet } from './components/connectWallet'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router'

import ProductDetails from './components/ui/ProductDetails.jsx'
import Cart from './components/ui/Cart.jsx'
import AllOrders from './components/ui/Seller/AllOrders.jsx'
import AddProduct from './components/ui/Seller/AddProduct.jsx'
import NewOrders from './components/ui/Seller/NewOrders.jsx'
import UserOrders from './components/ui/UserOrders.jsx'
import UserProfile from './components/ui/UserProfile.jsx'
import ViewListedProducts from './components/ui/Seller/ViewListedProducts.jsx'
import { HomePage } from './components/Home/HomePage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectWallet>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/shop" element={<App />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="products">
            <Route index element={<App />} />
            <Route path=":id" element={<ProductDetails />} />
            {/* <Route path="popular" element={<Popular />} /> */}
          </Route>

          <Route path="seller">
            <Route index element={<AllOrders />} />
            <Route path="list" element={<ViewListedProducts />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="new" element={<NewOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </ConnectWallet>
  </StrictMode>,
)
