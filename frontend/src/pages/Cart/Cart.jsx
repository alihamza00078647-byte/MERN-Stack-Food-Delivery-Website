import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import CartTotal from "../../components/CartTotal/CartTotal";

function Cart() {
  const {
    currency,
    delivery_fee,
    cartItem,
    removeFromCart,
    food_list,
    getTotalCartAmount,
    navigate,
  } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>{cartItem[item._id]}</p>
                  <p>
                    {currency} {item.price * cartItem[item._id]}
                  </p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>

      <CartTotal
        currency={currency}
        delivery_fee={delivery_fee}
        getTotalCartAmount={getTotalCartAmount}
        navigate={navigate}
      />
    </div>
  );
}

export default Cart;
