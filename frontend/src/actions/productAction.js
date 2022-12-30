// import instance from "instance"
import instance from "../instace";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS ,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, CLEAR_ERROR,NEW_REVIEW_FAIL,NEW_REVIEW_REQUEST,NEW_REVIEW_SUCCESS,ADMIN_PRODUCT_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,UPDATE_PRODUCT_FAIL,UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_RESET,UPDATE_PRODUCT_SUCCESS
  ,ALL_REVIEW_FAIL,ALL_REVIEW_REQUEST,ALL_REVIEW_RESET,ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,DELETE_REVIEW_REQUEST,DELETE_REVIEW_RESET,DELETE_REVIEW_SUCCESS} from "../constants/productConstants"


export const getProduct = (keyword="" , currentPage=1,price=[0,25000],category,ratings = 0)=>async(dispatch)=>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if(category){
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const {data} = await instance.get(link)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
           type: ALL_PRODUCT_FAIL,
           payload:error.response.data.message
        })
    }
}

//GET ALL PRODUCTS FOR ADMIN

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await instance.get("/api/v1/admin/products");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await instance.get(`/api/v1/product/${id}`);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // new review
  export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });

      const config = {
        headers:{"Content-Type":"application/json"}
      }
  
      const { data } = await instance.put(`/api/v1/review`,reviewData,config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ALL REVIEWS OF A PRODUCT
  export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const { data } = await instance.get(`/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //Delete  REVIEWS OF A PRODUCT
  export const deleteReviews = (reviewId , productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const { data } = await instance.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // CREATE product
  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });

      const config = {
        headers:{"Content-Type":"application/json"}
      }
  
      const { data } = await instance.post(`/api/v1/admin/product/new`,productData,config);
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // DELETE PRODUCT
  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const { data } = await instance.delete(`/api/v1/admin/product/${id}`);
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

 // UPDATE PRODUCT
 export const updateProduct = (id , productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers:{"Content-Type":"application/json"}
    }

    const { data } = await instance.put(`/api/v1/admin/product/${id}`,productData,config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



//clearing all error
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERROR
    })
}