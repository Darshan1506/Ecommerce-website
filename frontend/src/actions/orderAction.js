import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CLEAR_ERRORS,
    CREATE_ORDER_SUCCESS
} from "../constants/orderConstants";

import axios from "axios";

// Create Order

export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/order/new", order, config);
      console.log(data)
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

//clearing all error
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}