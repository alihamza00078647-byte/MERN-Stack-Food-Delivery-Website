import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./foodItem.css";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
    
    const {currency, cartItem, setCartItem, addToCart, removeFromCart, backendURL} = useContext(StoreContext);
    const [itemCount, setItemCount] = useState(0);

  
    return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={backendURL+"/images/"+image} alt="" />
        {
            !cartItem[id] ? <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} />
            : <div className="food-item-counter">
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red}  />
                <p>{cartItem[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">{currency}{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
