import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);





const StoreContextProvider= ({children}) => {

    const currency = "$";
    const [cartItem, setCartItem] = useState({});


    const addToCart = (itemId) => {
        // if Item doesnot exists
        if (!cartItem[itemId]) {
            setCartItem(prev => ({...prev, [itemId]:1}))

            // if item exist then increase the quantity.
        } else {
            setCartItem(prev => ({...prev, [itemId]:prev[itemId]+1}))
        }
    }


    const removeFromCart = (itemId) => {
        setCartItem(prev => ({...prev, [itemId]:prev[itemId]-1}))
    }

    useEffect(() => {
        console.log(cartItem)
    }, [cartItem])

    const value = {
        food_list, currency, cartItem, setCartItem, 
        addToCart, removeFromCart
    }


    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;