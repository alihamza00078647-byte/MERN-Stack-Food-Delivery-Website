import { useContext } from "react";
import "./Cart.css"
import { StoreContext } from "../../context/StoreContext";


function Cart() {

    const {currency, delivery_fee,cartItem, removeFromCart, food_list, getTotalCartAmount, navigate} = useContext(StoreContext);


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
                {
                    food_list.map((item, index) => {
                        if (cartItem[item._id] > 0) {
                            return (
                                <>
                                <div className="cart-items-title cart-items-item">
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>{currency}{item.price}</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>{currency} {item.price * cartItem[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                                </div>
                                <hr />
                                </>
                            )
                        }
                    })
                }
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>{currency}{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery fee</p>
                        <p>{currency}{delivery_fee}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>{currency}{getTotalCartAmount() + delivery_fee}</p>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promocode, Enter it here.</p>
                        <div className="cart-promocode-input">
                            <input type="text" name="" id="" placeholder="Promo Code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart;