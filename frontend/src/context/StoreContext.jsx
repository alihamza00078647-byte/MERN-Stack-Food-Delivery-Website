import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
    setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (token) {
      await axios.post(
        backendURL + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const currentCount = prev[itemId] || 0;
      const nextCount = currentCount - 1;

      if (nextCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [itemId]: nextCount };
    });

    if (token) {
      await axios.post(
        backendURL + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (!itemInfo) continue;
        totalAmount += itemInfo.price * cartItem[item];
      }
    }

    return totalAmount;
  };

  // get food List from DB.
  const getFoodList = async () => {
    try {
      const response = await axios.get(backendURL + "/api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
      // console.log(response.data.success)
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      backendURL + "/api/cart/get",
      {},
      { headers: { token } },
    );
    setCartItem(response.data.cartData || {});
  };

  useEffect(() => {
    async function load_data() {
      // get data from server.
      await getFoodList();
      // When We refresh the page it will check the token if exists then login else logout.
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
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

  // useEffect(() => {
  //   console.log(token);
  // }, [])

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
