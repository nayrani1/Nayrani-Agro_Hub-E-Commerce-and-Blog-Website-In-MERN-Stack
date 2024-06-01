import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  ADMIN_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from "../Constants/authConstants";

export const loginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        message: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
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

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isUpdated: action.payload.isUpdated,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdated: false,
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
export const UpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdated: false,
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



export const ForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const AdminAllUsers = (state = { Users: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        Users: action.payload.Users,
      };
    case ADMIN_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERRORS:
        return{
          ...state,
          error: null
        }
    default:
      return state;
  }
};
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DELETE_USER_RESET:
        return {
         ...state,
          loading: false,
          message: null,
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
