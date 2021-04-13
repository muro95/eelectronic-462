import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

//create reducers to response to productActions
export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            //when dispatch req action, sending an ajax to backend and waiting for resposne
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}