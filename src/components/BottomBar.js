import React, { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Paper } from '@mui/material';

const locationIds = {
  '/': 0,
  '/home': 0,
  '/account': 1,
  '/orders': 2,
  '/checkout': 3,
};

export default function BottomBar() {
  const location = useLocation();
  useEffect(() => {
    setValue(locationIds[location.pathname]);
  }, [location]);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: '1200px' }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{ backgroundColor: '#EFEFEF' }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => navigate('home')}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate('account')}
          label="Mi Perfil"
          icon={<AccountBoxIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate('orders')}
          label="Órdenes"
          icon={<ReceiptIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate('checkout')}
          label="Checkout"
          icon={<ShoppingCartIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
