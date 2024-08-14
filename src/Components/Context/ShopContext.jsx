import React , {createContext} from "react";
import all_pets from '../AllPets.js';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const contextValue = {all_pets};
    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;