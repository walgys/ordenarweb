import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { colors } from '../global/styles';
import { CartContext } from '../context/EcommerceContext';
import { actions } from '../reducers/EcommerceReducer';
const ProductCard = (props) => {
    const {id, name, price, image, quantity} = props
    const {dispatchCart} = useContext(CartContext)
  return (
    <Card elevation={5} sx={{ width: 345, margin: '20px', position: 'relative' }}>
    <CardContent sx={{padding: '0px 0.5rem 0px 0.5rem', backgroundColor: colors.grey2}}>
      <Typography variant="h6" component="div">
        {name}
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      sx={{objectFit: 'cover', height: '100%'}}
      image={image}
    />
    <div style={{
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '10px 0px 10px 0px',
    borderRadius: '20px',
    width: '100px',
    height: '20px',
    bottom: '20px',
    right: '20px',
    backgroundColor: colors.cardBackground
  }}><IconButton onClick={()=>dispatchCart({
    type: actions.REMOVE_FROM_CART,
    payload: { productId: id, quantity: 1 },
  })}><RemoveIcon /></IconButton>{quantity}<IconButton onClick={()=>dispatchCart({
    type: actions.ADD_TO_CART,
    payload: { productId: id, quantity: 1, name: name, price: price },
  })}><AddIcon /></IconButton></div>
  </Card>
  )
}

export default ProductCard