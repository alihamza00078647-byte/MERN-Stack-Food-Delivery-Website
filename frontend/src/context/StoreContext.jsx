import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);





const StoreContextProvider= ({children}) => {












    const value = {
        food_list
    }


    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;