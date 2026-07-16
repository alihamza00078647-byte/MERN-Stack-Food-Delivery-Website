import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext(null);


const StoreContextProvider = ({ children }) => {
  
  const currency = "$";
  const delivery_fee = 10;
  const backendURL = "http://localhost:3001";
  
  
  
  // Hooks Will define here.
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);



  const addToCart = async (itemId) => {
    // if Item doesnot exists
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));

      // if item exist then increase the quantity.
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(backendURL + "/api/cart/add", {itemId} ,{headers: {token}});
    }
  };


  const removeFromCart = async (itemId) => {
    console.log(itemId)
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(backendURL + "/api/cart/remove", {itemId}, {headers: {token}})
    }
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

  // get food List from DB.
  const getFoodList = async () => {
    const response = await axios.get(backendURL + "/api/food/list");
    setFoodList(response.data.data);
  }

  const loadCartData = async (token) => {
    const response = await axios.post(backendURL + "/api/cart/get", {}, {headers: {token}});
    setCartItem(response.data.cartData);
  }

  useEffect(() => {
    async function load_data() {
      // get data from server.
      await getFoodList();
      // When We refresh the page it will check the token if exists then login else logout.
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    load_data();
  }, []);

  const value = {
    food_list,
    currency,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    delivery_fee,
    navigate,
    backendURL,
    token,
    setToken,
    };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
