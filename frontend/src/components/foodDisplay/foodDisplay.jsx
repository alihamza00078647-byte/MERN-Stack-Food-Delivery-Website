import { useContext } from "react";
import "./foodDisplay";
import { StoreContext } from "../../context/StoreContext";


function FoodDisplay({category}) {


    const {food_list} = useContext(StoreContext);

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {
                    food_list.map((item, index) => {
                        return (
                            <div></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay;