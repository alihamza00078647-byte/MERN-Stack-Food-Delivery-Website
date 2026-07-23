import { useState } from "react";
import "./Orders.css";
import { backendURL } from "../Add/Add";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

function Orders() {
  const [order, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(backendURL + "/api/order/list");
      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((odr, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} />
            <div>
              <p className="order-item-food">
                {odr.items.map((item, index) => {
                  if (index === odr.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {odr.address.firstName + " " + odr.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{odr.address.street + ","}</p>
                <p className="order-item-city">
                  {odr.address.city +
                    ", " +
                    odr.address.state +
                    ", " +
                    odr.address.country +
                    ", " +
                    odr.address.zipcode}
                </p>
                <p className="order-item-phone">{odr.address.phone}</p>
              </div>
                <p className="">Items: {odr.items.length}</p>
                <p className="order-item-phone">${odr.amount}</p>
                <select name="" id="">
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
