import axios from "axios";
import {
  ADD_BLOG_FAIL,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADMIN_ALL_BLOGS_FAIL,
  ADMIN_ALL_BLOGS_REQUEST,
  ADMIN_ALL_BLOGS_SUCCESS,
  ADMIN_UPDATE_BLOG_FAIL,
  ADMIN_UPDATE_BLOG_REQUEST,
  ADMIN_UPDATE_BLOG_SUCCESS,
  BLOG_COMMENT_FAIL,
  BLOG_COMMENT_REQUEST,
  BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  FETCH_BLOG_FAIL,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_SINGLE_BLOG_FAIL,
  FETCH_SINGLE_BLOG_REQUEST,
  FETCH_SINGLE_BLOG_SUCCESS,
} from "../Constants/blogConstants";
import { CLEAR_ERRORS } from "../Constants/ProductsConstant";

export const fetchBlogAction = (category, currentPage) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BLOG_REQUEST });
    let api = `http://localhost:8080/api/v1/blog/all?page=${currentPage}`;
    if (category) {
      api = `http://localhost:8080/api/v1/blog/all?category=${category}&page=${currentPage}`;
    }
    const { data } = await axios.get(api, { withCredentials: true });

    dispatch({ type: FETCH_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BLOG_FAIL, payload: error.response.data.message });
  }
};

export const fetchSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SINGLE_BLOG_REQUEST });
    const api = `http://localhost:8080/api/v1/blog/single/${id}`;
    const { data } = await axios.get(api, { withCredentials: true });
    dispatch({ type: FETCH_SINGLE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADD NEW BLOG
export const AddBlogAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_BLOG_REQUEST });
    const api = `http://localhost:8080/api/v1/blog/add`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(api, formData, config);
    dispatch({ type: ADD_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_BLOG_FAIL, payload: error.response.data.message });
  }
};

//Admin Fetch all blogs
export const FetchAdminBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ALL_BLOGS_REQUEST });
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/admin/blog/all",
      { withCredentials: true }
    );
    dispatch({ type: ADMIN_ALL_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ALL_BLOGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update Blog
export const UpdateBlogAction = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_UPDATE_BLOG_REQUEST });
    const api = `http://localhost:8080/api/v1//blog/update/${id}`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(api, formData, config);
    dispatch({ type: ADMIN_UPDATE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete blog action
export const DeleteBlogAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });
    const api = `http://localhost:8080/api/v1/blog/delete/${id}`;
    const { data } = await axios.delete(api, { withCredentials: true });
    dispatch({ type: DELETE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_BLOG_FAIL, payload: error.response.data.message });
  }
};

// Add New Comment
export const addNewComment = (formData) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_COMMENT_REQUEST });
    const api = `http://localhost:8080/api/v1//blog/add/Comment`;
    const congig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(api, formData, congig);
    dispatch({ type: BLOG_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BLOG_COMMENT_FAIL, payload: error.response.data.message });
  }
};

// clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
