import axios from "axios";
import {
  ADMIN_ALL_ORDER_REQUEST,
  ADMIN_ALL_ORDER_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DETAIL_ORDER_ERROR,
  DETAIL_ORDER_REQUEST,
  DETAIL_ORDER_SUCCESS,
  GET_ORDERS_ERROR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  RECENT_ORDER_ERROR,
  RECENT_ORDER_REQUEST,
  RECENT_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_ERROR,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../Constants/OrderConstants";

// add new order
export const CreateOrderAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const api = `http://localhost:8080/api/v1/order/create`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(api, order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get users all orders

export const GetOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/user/all/orders`,
      { withCredentials: true }
    );
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDERS_ERROR, payload: error.response.data.message });
  }
};

// single Order Action
export const SingleOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_ORDER_REQUEST });
    const api = `http://localhost:8080/api/v1//order/single/${id}`;
    const { data } = await axios.get(api, { withCredentials: true });
    dispatch({ type: DETAIL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DETAIL_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};
// All Order By Admin
export const OrderByAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_ORDER_REQUEST });
    const api = `http://localhost:8080/api/v1/admin/all/orders`;
    const { data } = await axios.get(api, { withCredentials: true });
    dispatch({ type: ADMIN_ALL_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_ORDER_SUCCESS,
      payload: error.response.data.message,
    });
  }
};
// delete order action
export const DeleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const api = `http://localhost:8080/api/v1/admin/order/delete/${id}`;
    const { data } = await axios.delete(api, { withCredentials: true });
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};
// recent orders
export const RecentOrdersAction = () => async (dispatch) => {
  try {
    dispatch({ type: RECENT_ORDER_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/admin/recent/orders`,
      { withCredentials: true }
    );
    dispatch({ type: RECENT_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RECENT_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};
// update order status
export const UpdateStatusAction = (id, orderStatus) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    const api = `http://localhost:8080/api/v1/admin/update/order/status/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(api, { orderStatus }, config);
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_ERROR,
      payload: error.response.data.message,
    });
  }
};
// clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
