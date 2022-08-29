import React,{createContext, useReducer} from "react";
import { cartInitialState } from "../global/globals";
import { CartReducer } from "../reducers/EcommerceReducer";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cart, dispatchCart] = useReducer(CartReducer, cartInitialState);
    return (
        <CartContext.Provider value={{cart, dispatchCart}} >
            {props.children}
        </CartContext.Provider>
    )
}