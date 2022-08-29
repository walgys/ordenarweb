import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { colors } from '../global/styles';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../global/fb';
import { CartContext } from '../context/EcommerceContext';
import { actions } from '../reducers/EcommerceReducer';
import { useNavigate } from 'react-router-dom';
import {Image} from 'mui-image'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 1,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const TopBar = () => {
  const { cart, dispatchCart } = React.useContext(CartContext);
  const doSignOut = () => {
    dispatchCart({
      type: actions.EMPTY_CART,
    });
    signOut(auth);
  };
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: colors.buttons }}>
        <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => doSignOut()}
          >
            <LogoutIcon />
          </IconButton>
          <Image src={require('../assets/logo.png')} width={200} height={50}/>
          <IconButton aria-label="cart" onClick={()=>navigate('/checkout', {replace: true})}>
            <StyledBadge badgeContent={cart.totalItems} color="primary">
              <ShoppingCartIcon style={{ color: 'whitesmoke' }} />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
