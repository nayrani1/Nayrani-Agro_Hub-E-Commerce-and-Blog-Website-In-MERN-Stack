import { CLEAR_ERRORS } from "../Constants/ProductsConstant";
import {
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_FAIL,
  FETCH_SINGLE_BLOG_FAIL,
  FETCH_SINGLE_BLOG_REQUEST,
  FETCH_SINGLE_BLOG_SUCCESS,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAIL,
  ADMIN_ALL_BLOGS_REQUEST,
  ADMIN_ALL_BLOGS_SUCCESS,
  ADMIN_ALL_BLOGS_FAIL,
  ADMIN_UPDATE_BLOG_REQUEST,
  ADMIN_UPDATE_BLOG_SUCCESS,
  ADMIN_UPDATE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_RESET,
  BLOG_COMMENT_REQUEST,
  BLOG_COMMENT_SUCCESS,
  BLOG_COMMENT_FAIL,
  BLOG_COMMENT_RESET,
} from "../Constants/blogConstants";

export const blogReducer = (state = { Blogs: [] }, action) => {
  switch (action.type) {
    case FETCH_BLOG_REQUEST:
    case ADMIN_ALL_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BLOG_SUCCESS:
    case ADMIN_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        Blogs: action.payload.Blogs,
        resPerPage: action.payload.resPerPage,
        totalBlogs: action.payload.totalBlogs,
        error: null,
      };
    case FETCH_BLOG_FAIL:
    case ADMIN_ALL_BLOGS_FAIL:
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
export const SingleBlogReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case FETCH_SINGLE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blog: action.payload.blog,
        error: null,
      };
    case FETCH_SINGLE_BLOG_FAIL:
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
export const addBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BLOG_REQUEST:
    case ADMIN_UPDATE_BLOG_REQUEST:
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_BLOG_SUCCESS:
    case DELETE_BLOG_SUCCESS:
    case ADMIN_UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: null,
      };
    case DELETE_BLOG_RESET:
      return {
        ...state,
        message: null,
      };
    case ADD_BLOG_FAIL:
    case ADMIN_UPDATE_BLOG_FAIL:
    case DELETE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        message: null,
      };
    default:
      return state;
  }
};

export const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BLOG_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: null,
      };
    case BLOG_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        message: null,
      };
    case BLOG_COMMENT_RESET:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};
