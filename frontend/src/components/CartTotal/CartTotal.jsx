import { useState } from "react";
import "./CartTotal.css";

function CartTotal({ currency, delivery_fee, getTotalCartAmount, navigate }) {
  const path = window.location.pathname;

//   const { visible, setVisible } = useState(false);

  return (
    <div className="cart-bottom">
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
            {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + delivery_fee}
          </p>
        </div>
        <button onClick={() => path === "/cart" ? navigate("/order") : navigate('')}>
         {path === "/cart" ? "PROCEED TO CHECKOUT": "PROCEED TO PAYMENT"}
        </button>
      </div>

      {/* ----- Promo Code ----- */}

      <div className={`cart-promocode ${path === "/cart" ? "" : "hidden"}`}>
        <div>
          <p>If you have a promocode, Enter it here.</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
