import { LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERROR,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST
 } from "../constants/userConstants"
import axios from "axios";

export const login = (email,password)=> async (dispatch) =>{
    try {
        dispatch({type:LOGIN_REQUEST});

        const config = {headers:{"Content-Type":"application/json"}}

        const {data} = await axios.post(
            `/api/v1/login`,
            {email,password},
            config
        )
        dispatch({type: LOGIN_SUCCESS , payload:data.user})
    } catch (error) {
        dispatch({type:LOGIN_FAIL , payload: error.response.data.message})
    }

}
export const register = (userData)=> async (dispatch) =>{
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        console.log("requested")
    
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        console.log(userData)
        const { data } = await axios.post(`/api/v1/register`, userData, config);
    
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
      } catch (error) {
        console.log(error)
        dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message,
        });
      }
}


//clearing all error
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERROR
    })
}
