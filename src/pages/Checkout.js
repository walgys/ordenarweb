import React, { useContext, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { CartContext } from '../context/EcommerceContext';
import { purchaseCart } from '../global/data';
import { actions } from '../reducers/EcommerceReducer';
import { colors } from '../global/styles';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const { cart, dispatchCart } = useContext(CartContext);
  const { user, setSnackText, handleClick, setSnackType } = useContext(AppContext);
  const [outOfStock, setOutOfStock] = useState([]);
  const sendCart = async (user, cart) => {
    const result = await purchaseCart(user, cart);
    if (result.result == 'ok')
      dispatchCart({
        type: actions.EMPTY_CART,
      });
    if (result.result == 'empty') console.log('empty cart');
    if (result.result == 'outOfStock') {
      const text = result.outOfStock
        .map(
          (item) =>
            `${item.available === 1 ? 'queda' : 'quedan'} ${item.available} ${
              item.available === 1 ? 'unidad' : 'unidades'
            } de ${item.name}`
        )
        .join(' y ');
      setSnackText(`No podemos completar el pedido, ${text}`);
      setSnackType('error')
      handleClick();
      setOutOfStock(result.outOfStock);
    }
  };
  return (
  
    <div>
      <div className="no-scroll" style={{ height: '100%', overflow: 'scroll' }}>
        {cart.products.length === 0 && <Typography variant='h5' align='center'>El carrito está vacío</Typography>}
        {cart.products.length > 0 && cart.products.map((product) => {
          const foundOutOfStock = outOfStock.find(
            (prod) => prod.id === product.productId
          );
          const isOutOfStock =
            foundOutOfStock?.available < product?.quantity ? true : false;

          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0px 1rem 0px 1rem',
                margin: '0.5rem 0rem 0.5rem 0rem',
                backgroundColor: isOutOfStock ? 'red' : colors.headerText,
              }}
            >
              <Typography
                sx={{ flex: 0.3 }}
              >{`${product.quantity}x`}</Typography>
              <Typography sx={{ flex: 3 }}>{product.name}</Typography>
              <Typography sx={{ flex: 1 }}>{`$${product.price}`}</Typography>
              <Typography sx={{ flex: 0.3 }}>{`$${
                product.price * product.quantity
              }`}</Typography>
            </div>
          );
        })}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0rem 1rem rem 1rem',
            margin: '1rem',
          }}
        >
           {cart.products.length > 0 && <Button
            onClick={() =>
              dispatchCart({
                type: actions.EMPTY_CART,
              })
            }
            variant="contained"
            color="error"
          >
            Vaciar carrito
          </Button>}
          {cart.products.length > 0 && <Typography
            align="right"
            variant="h5"
          >{`Total $${cart.totalPrice}`}</Typography>}
        </div>
      </div>
      <Button
        onClick={() => sendCart(user, cart)}
        variant="contained"
        disabled={!cart.products.length > 0}
        sx={{ backgroundColor: colors.buttons }}
      >
        Realizar Pedido
      </Button>
    </div>
  );
};

export default Checkout;
