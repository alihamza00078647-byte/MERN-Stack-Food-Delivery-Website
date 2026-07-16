import { useContext, useState } from "react";
import CartTotal from "../../components/CartTotal/CartTotal";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

function PlaceOrder() {
  const {
    getTotalCartAmount,
    delivery_fee,
    currency,
    token,
    food_list,
    cartItem,
    backendURL,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    // console.log(orderItems)
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + delivery_fee,
    };

    let response = await axios.post(
      backendURL + "/api/order/place",
      orderData,
      { headers: { token } },
    );
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error(response.data.message);
    }
  };

  //  useEffect(() => {
  //   console.log(data)
  //  }, [data])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email"
          required
        />
        <input
          type="street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip Code"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="number"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone No."
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>
              {currency}
              {getTotalCartAmount()}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>
              {currency}
              {getTotalCartAmount() === 0 ? 0 : delivery_fee}
            </p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>
              {currency}
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + delivery_fee}
            </p>
          </div>
          <button onClick={() => navigate("/orders")}>
            PROCEED TO PAYMENT
          </button>
        </div>

        {/* <CartTotal
          getTotalCartAmount={getTotalCartAmount}
          delivery_fee={delivery_fee}
          currency={currency}
          session_url={session_url}
        /> */}
      </div>
    </form>
  );
}

export default PlaceOrder;
