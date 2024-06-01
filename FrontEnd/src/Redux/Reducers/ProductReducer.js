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
  ADD_PRODUCT_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_UPDATE_REQUEST,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../Constants/ProductsConstant";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        resPerPage: action.payload.resPerPage,
      };
    case ADMIN_PRODUCT_SUCCESS:
      case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const ProductDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
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

// add update delete products
export const AddProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT_SUCCESS:
    case ADMIN_PRODUCT_UPDATE_SUCCESS:
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case ADD_PRODUCT_RESET:
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        message: null,
      };
    case ADD_PRODUCT_FAIL:
    case ADMIN_PRODUCT_UPDATE_FAIL:
    case ADMIN_PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// add review
export const AddReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_REVIEW_RESET:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};
