import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_UPDATE_REQUEST,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAIL,
  ADMIN_PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../Constants/ProductsConstant";
export const FetchProducts =
  (keyword, currentPage, category, price, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let api = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        api = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      const { data } = await axios.get(api, { withCredentials: true });
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const FetchSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/product/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add Product Action
export const AddNewProductAction = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const api = `http://localhost:8080/api/v1/admin/product/add`;
    const { data } = await axios.post(api, productData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Admin products
export const AdminAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/admin/all/products`,
      { withCredentials: true }
    );
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Admin products
export const AllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/products/-1`,
      { withCredentials: true }
    );
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update product
export const UpdateProductAction = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_UPDATE_REQUEST });
    const api = `http://localhost:8080/api/v1/admin/product/${id}`;
    const { data } = await axios.put(api, productData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: ADMIN_PRODUCT_UPDATE_SUCCESS, payload: data.message, });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//  delete product 
export const DeleteProduct = (id)=> async (dispatch)=>{
  try{
    dispatch({type: ADMIN_PRODUCT_DELETE_REQUEST})
    const api = `http://localhost:8080/api/v1/admin/product/${id}`
    const {data} = await axios.delete(api,{withCredentials:true})
    dispatch({type:ADMIN_PRODUCT_DELETE_SUCCESS, payload:data})
  }catch(error){
    dispatch({
      type:ADMIN_PRODUCT_DELETE_FAIL, 
      payload: error.response.data.message,
    });
  }
}

// Add Product Review
export const AddProductReview = (formData)=>async(dispatch)=>{
  try{
    dispatch({type: PRODUCT_REVIEW_REQUEST})
    const api = `http://localhost:8080/api/v1//product/review/add/`
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
    const {data}= await axios.put(api, formData, config)
    dispatch({type: PRODUCT_REVIEW_SUCCESS, payload: data})
  }catch(error){
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload: error.response.data.message,
    })
  }
}
//    clear all errors
export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
