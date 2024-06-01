import axios from "axios";
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
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
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
} from "../Constants/authConstants";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const api = "http://localhost:8080/api/v1/user/login";
    const { data } = await axios.post(
      api,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const signUpAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const api = "http://localhost:8080/api/v1/user/signup";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(api, formData, config);
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/user/profile",
      { withCredentials: true }
    );
    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
export const logoutAction = () => async (dispatch) => {
  try {
    const data = await axios.get("http://localhost:8080/api/v1/user/logout", {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const api = "http://localhost:8080/api/v1/user/profile/update";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(api, formData, config);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const api = "http://localhost:8080/api/v1/user/password/change";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(api, formData, config);
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const ForgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const api = "http://localhost:8080/api/v1/forgot/password";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(api, { email }, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};
export const ResetPasswrod = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const api = `http://localhost:8080/api/v1/password/reset/${token}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(api, passwords, config);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Admin ALL Users
export const AdminAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_USERS_REQUEST });
    const { data } = await axios.get(
      "http://localhost:8080/api/v1//admin/users/all",
      { withCredentials: true }
    );
    dispatch({ type: ADMIN_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// delete user
export const DeleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const api = `http://localhost:8080/api/v1//admin/deleteuser/${id}`;
    const { data } = await axios.delete(api, { withCredentials: true });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//   clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
