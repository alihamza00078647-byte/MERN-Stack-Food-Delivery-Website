import { useContext } from "react";
import CartTotal from "../../components/CartTotal/CartTotal";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

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
    phone:""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}));
   }

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="street" placeholder="Street" />

        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="number" placeholder="Phone No." />
      </div>
      <div className="place-order-right">
        <CartTotal
          getTotalCartAmount={getTotalCartAmount}
          delivery_fee={delivery_fee}
          currency={currency}
        />
      </div>
    </div>
  );
}

export default PlaceOrder;
