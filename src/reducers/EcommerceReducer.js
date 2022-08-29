import {cartInitialState} from '../global/globals'

export const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  EMPTY_CART: 'EMPTY_CART'
};

export const CartReducer = (state, action) => {
  const { products } = state;
  switch (action.type) {
    case 'ADD_TO_CART':  
      const foundProductToAdd = products.find(
        ({ productId }) => productId === action.payload.productId
      );
      const newProductsToAdd = foundProductToAdd
        ? products.map((product) =>
            product.productId === action.payload.productId
              ? {
                  ...product,
                  quantity: product.quantity + action.payload.quantity,
                  subtotal:
                    (product.quantity + action.payload.quantity) *
                    product.price,
                }
              : product
          )
        : [...products, action.payload];
      const newAddState = {
        ...state,
        products: newProductsToAdd,
        totalItems: newProductsToAdd.reduce((acc, a) => acc + a.quantity, 0),
        totalPrice: newProductsToAdd.reduce(
          (acc, a) => acc + a.price * a.quantity,
          0
        ),
      };
      return newAddState;
      case 'REMOVE_FROM_CART':
      const foundProductToRemove = products.find(
        ({ productId }) => productId === action.payload.productId
      );
       let newProductsToRemove;
      if(!foundProductToRemove) return state; 
      if(foundProductToRemove && foundProductToRemove.quantity - action.payload.quantity <= 0 ){
        newProductsToRemove = products.filter(({ productId }) => productId !== action.payload.productId);
      }else{
        newProductsToRemove = foundProductToRemove
        ? products.map((product) =>
            product.productId === action.payload.productId
              ? {
                  ...product,
                  quantity: product.quantity - action.payload.quantity,
                  subtotal:
                    (product.quantity + action.payload.quantity) *
                    product.price,
                }
              : product
          )
        : [...products, action.payload];
      } 
      const newState = {
        ...state,
        products: newProductsToRemove,
        totalItems: newProductsToRemove.reduce((acc, a) => acc + a.quantity, 0),
        totalPrice: newProductsToRemove.reduce(
          (acc, a) => acc + a.price * a.quantity,
          0
        ),
      };
      return newState;
      case 'EMPTY_CART':
        return cartInitialState;
    default:
      return state;
  }
};
