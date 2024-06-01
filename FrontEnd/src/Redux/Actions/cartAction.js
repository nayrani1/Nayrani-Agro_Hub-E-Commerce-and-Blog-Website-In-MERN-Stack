import axios from "axios";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";

// add to cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1/product/${id}`,
    { withCredentials: true }
  );
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      category: data.product.category,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
// remove from cart
export const removeCartItem = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
// clear Cart
export const ClearCart = ()=> async(dispatch)=>{
  dispatch({type:CLEAR_CART});
  localStorage.setItem("cartItems",JSON.stringify([]));
}
// save shipping address
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
