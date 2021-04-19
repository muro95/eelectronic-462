import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import { CART_EMPTY } from "../constants/orderConstants";

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
                    error: '',
                    cartItems: state.cartItems.map( (x) => 
                    x.product === existItem.product? item : x
                    ),
                };
            } else {
                //adding new item to the cart, added item at the end of the cart
                return { ...state, error: '',cartItems: [...state.cartItems, item]}; 
            }
        case CART_REMOVE_ITEM:
            return { 
                //filtering out the product that id is equal action.payload 
                ...state, 
                error: '',
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress : action.payload };
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case CART_ADD_ITEM_FAIL:
            return { ...state, error: action.payload};
        case CART_EMPTY:
            return { ...state, error:'',cartItems: [] };
        default:
            return state;
    }
};