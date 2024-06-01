import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  AddProductReducer,
  AddReviewReducer,
  ProductDetailReducer,
  productReducer,
} from "./Redux/Reducers/ProductReducer";
import {
  AdminAllUsers,
  ForgotPasswordReducer,
  UpdatePasswordReducer,
  deleteUserReducer,
  loginReducer,
  updateProfileReducer,
} from "./Redux/Reducers/authReducer";
import { cartReducer } from "./Redux/Reducers/cartReducer";
import { SingleBlogReducer, addBlogReducer, addCommentReducer, blogReducer } from "./Redux/Reducers/blogReducer";
import { AllOrdersReducer, DeleteOrderReducer, GetOrdersReducer, OrderDetailsReducer, OrderReducer, RecentOrdersReducer } from "./Redux/Reducers/OrderReducer";
const rootReducer = combineReducers({
  Products: productReducer,
  ProductDetail: ProductDetailReducer,
  Auth: loginReducer,
  profileUpdate: updateProfileReducer,
  passwordUpdate: UpdatePasswordReducer,
  forgotPassword: ForgotPasswordReducer,
  cart: cartReducer,
  blog: blogReducer,
  singleBlog: SingleBlogReducer,
  addProduct: AddProductReducer,
  addBlog: addBlogReducer,
  NewOrder: OrderReducer,
  Orders: GetOrdersReducer,
  Order: OrderDetailsReducer,
  AddReview: AddReviewReducer,
  AddComment: addCommentReducer,
  AdminOrders: AllOrdersReducer,
  Users : AdminAllUsers,
  deleteUser: deleteUserReducer,
  deleteOrder: DeleteOrderReducer,
  RecentOrder: RecentOrdersReducer, 
});

//  loacalStorage get cart items and shipping info into initial state
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = legacy_createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
