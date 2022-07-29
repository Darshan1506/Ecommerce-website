import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CLEAR_ERRORS,
    CREATE_ORDER_SUCCESS
} from "../constants/orderConstants";

export const newOrderReducer = (state = {},action)=>{
    switch (action.type){
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true
            }
        
        case CREATE_ORDER_SUCCESS:
            return {
                loading:false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL :
            return {
                loading:true,
                error:action.payloads
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }
}