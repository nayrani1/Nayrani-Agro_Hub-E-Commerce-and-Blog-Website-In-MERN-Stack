import { useEffect } from "react";
import "./css/Style.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUser } from "./Redux/Actions/authAction";
import HomePage from "./Components/Pages/Main/HomePage";
import AboutUsPage from "./Components/Pages//Main/AboutUsPage";
import ContactUsPage from "./Components/Pages/Main/ContactUsPage";
import Login from "./Components/Pages/Auth/Login";
import SignUp from "./Components/Pages/Auth/Signup";
import ProfilePage from "./Components/Pages/Profile/ProfilePage";
import Page404 from "./Components/Pages/Main/Page404";
import ProductsPage from "./Components/Pages/products/ProductsPage";
import SingleProduct from "./Components/Pages/products/SingleProduct";
import SearchedProducts from "./Components/Pages/products/SearchedProducts.js";
import BlogComponent from "./Components/Pages/Blogs/Blogs";
import Dashboard from "./Admin/pages/Dashboard.js";
import ProductList from "./Admin/pages/ProductList.js";
import AddBlog from "./Admin/pages/AddBlog.js";
import store from "./store";
import ProtectedRoute from "./Route/ProtectedRoute.js";
import AdminRoute from "./Route/AdminRoute.js";
import ChangePassword from "./Components/Pages/Auth/ChangePassword.js";
import ForgotPassword from "./Components/Pages/Auth/ForgotPassword.js";
import ResetPassword from "./Components/Pages/Auth/ResetPassword.js";
import Cart from "./Components/layouts/cart/Cart.js";
import ShippingInfo from "./Components/layouts/cart/Shipping.js";
import ConfirmOrder from "./Components/layouts/cart/ConfirmOrder.js";
import ReadBlog from "./Components/Pages/Blogs/ReadBlog.js";
import AddProduct from "./Admin/pages/AddProduct.js";
import NoProductFound from "./Components/Pages/products/NoProductFound.js";
import FieldAnimation from "./test.js";
import AllBlogs from "./Admin/pages/AllBlogs.js";
import Payment from "./Components/layouts/cart/ElementWrapper.js";
import MyOrders from "./Components/Pages/Orders/MyOrders.js";
import SingleOrder from "./Components/Pages/Orders/SingleOrder.js";
import Orders from "./Admin/pages/Orders.js";
import Users from "./Admin/pages/Users.js";
import ProcessOrder from "./Admin/pages/ProcessOrder.js";
import Services from "./Components/Pages/Main/Services.js";


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/password/change" element={<ChangePassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/user/orders" element={<MyOrders/>}/>
            <Route path="/user/order/:id" element={<SingleOrder/>}/>
            <Route path="/all/users" element={<Users/>}/>
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/product/add" element={<AddProduct />} />
            <Route path="/product/list" element={<ProductList />} />
            <Route path="/blog/add" element={<AddBlog />} />
            <Route path="/admin/blogs" element={<AllBlogs />} />
            <Route path="/admin/all/orders" element={<Orders/>}/>
            <Route path="/order/process/:id" element={<ProcessOrder/>}/>
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact/us" element={<ContactUsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/search/products/:keyword"
            element={<SearchedProducts />}
          />
          <Route path="/product/not-found" element={<NoProductFound />} />
          <Route path="/single/product/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blogs" element={<BlogComponent />} />
          <Route path="/blogs/read/:id" element={<ReadBlog />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/anime" element={<FieldAnimation />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
