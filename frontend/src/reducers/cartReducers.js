import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            //check if there is a same product in the cart by 
            //comparing the current proudctId that going to add witht the productId in the cart 
            const existItem = state.cartItems.find(x => x.product === item.product);
            //if product already exist 
            if(existItem){
                return {
                    ...state, 
                    cartItems: state.cartItems.map( (x) => 
                    x.product === existItem.product? item : x
                    ),
                };
            } else {
                //adding new item to the cart, added item at the end of the cart
                return { ...state, cartItems: [...state.cartItems, item]}; 
            }
        case CART_REMOVE_ITEM:
            return { 
                //filtering out the product that id is equal action.payload 
                ...state, 
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
    default:
        return state;
    }
};