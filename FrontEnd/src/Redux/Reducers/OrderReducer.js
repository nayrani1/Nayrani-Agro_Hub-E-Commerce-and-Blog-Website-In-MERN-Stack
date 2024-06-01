import {
  ADMIN_ALL_ORDER_ERROR,
  ADMIN_ALL_ORDER_REQUEST,
  ADMIN_ALL_ORDER_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
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
  UPDATE_ORDER_STATUS_RESET,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "../Constants/OrderConstants";

export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
        message: action.payload.message,
      };
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        message: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const GetOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        message: action.payload.message,
      };
    case GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const OrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case DETAIL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload.order,
      };
    case DETAIL_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };
    case ADMIN_ALL_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const DeleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ORDER_SUCCESS:
      case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case DELETE_ORDER_ERROR:
      case UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    case DELETE_ORDER_RESET:
      case UPDATE_ORDER_STATUS_RESET:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export const RecentOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECENT_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RECENT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
    case RECENT_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
