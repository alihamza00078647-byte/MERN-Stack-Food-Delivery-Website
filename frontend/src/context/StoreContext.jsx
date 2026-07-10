import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  
  const currency = "$";
  const delivery_fee = 10;

  // Hooks Will define here.
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId) => {
    // if Item doesnot exists
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));

      // if item exist then increase the quantity.
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }

    return totalAmount;
  };

  const value = {
    food_list,
    currency,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    delivery_fee,
    navigate
    };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
