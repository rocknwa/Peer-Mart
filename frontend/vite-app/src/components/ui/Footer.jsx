import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Add, AttachMoneyRounded, BusinessCenter, Person, ShoppingBag, ShoppingBasketTwoTone } from '@mui/icons-material';

export default function Footer() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value} onChange={handleChange}>
        {/* User Menu */}
      <BottomNavigationAction
        href='/'
        label="Shop"
        value="shop"
        icon={<ShoppingBag />}
      />
      <BottomNavigationAction
        href='/orders'
        label="User Orders"
        value="User Orders"
        icon={<ShoppingBasketTwoTone />}
      />

      {/* Shared */}
      <BottomNavigationAction
        href='/profile'
        label="User Profile"
        value="User Profile"
        icon={<Person />}
      />

      {/* Seller Menu */}
      <BottomNavigationAction
        href='/seller/add'
        label="Add Product"
        value="Add Product"
        icon={<Add />}
      />
      <BottomNavigationAction
        href='/seller/new'
        label="New Orders"
        value="New Orders"
        icon={<AttachMoneyRounded />}
      />
      <BottomNavigationAction 
        href='/seller' 
        label="Seller" 
        value="Listed" 
        icon={<BusinessCenter />} 
      />
      
    </BottomNavigation>
  );
}
