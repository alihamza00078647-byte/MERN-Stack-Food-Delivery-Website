import { useState } from "react";
import "./Myorders.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

function Myorders() {
  const [data, setData] = useState([]);
  const { token, backendURL, currency } = useContext(StoreContext);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        backendURL + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if (token) {
        fetchOrder();
    }
  }, [token])

  return (
   <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} />
            <p>{order.items.map((item, index) => {
              if (index === order.items.length -1) {
                return item.name + " X " + item.quantity
              } else {
                return item.name + " X " + item.quantity + ", "
              }
            })}</p>
            <p>{currency}{order.amount}.00</p>
            <p>Item : {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
            <button>Track Order</button>
          </div>
        ))}
      </div>
   </div>
  );
}

export default Myorders;
