import instance from "../instace";
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CLEAR_ERRORS,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_RESET,
    UPDATE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_RESET,
    DELETE_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS
} from "../constants/orderConstants";

// import instance from "instance";

// Create Order

export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await instance.post("/api/v1/order/new", order, config);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };



//My Orders
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const { data } = await instance.get("/api/v1/orders/me");
      dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //Get all Orders admin
  export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const { data } = await instance.get("/api/v1/admin/orders");
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  //Update Order (Admin)
  export const updateOrder = (id ,order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDERS_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await instance.put(`/api/v1/admin/order/${id}`, order, config);
      dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

   //Delete Order (Admin)
   export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDERS_REQUEST });
  
      const { data } = await instance.delete(`/api/v1/admin/order/${id}`);
      dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //GET ORDER Details
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const { data } = await instance.get(`/api/v1/order/${id}`);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
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