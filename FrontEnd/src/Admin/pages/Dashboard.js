import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../Style.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AdminAllUsers, logoutAction } from "../../Redux/Actions/authAction";
import {
  AdminAllProducts,
  ClearErrors,
} from "../../Redux/Actions/ProductAction";
import Loader from "../../Components/layouts/Features/Loader";
import Chart from "../components/Chart";
import AdminCard from "../components/Card";
import { OrderByAdmin } from "../../Redux/Actions/OrderActions";
import { FetchAdminBlogs } from "../../Redux/Actions/blogAction";
import RecentOrders from "../components/RecentOrders";
const Dashboard = () => {
  const toastAlert = (error) => toast.error(error);
  const { user } = useSelector((state) => state.Auth);
  const [logout, setLogout] = useState(false);
  const logoutHandler = () => setLogout(true);
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector((state) => state.Products);
  const { totalAmount, orders } = useSelector((state) => state.AdminOrders);
  const { Users } = useSelector((state) => state.Users);
  const { Blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(AdminAllProducts());
    dispatch(OrderByAdmin());
    dispatch(AdminAllUsers());
    dispatch(FetchAdminBlogs());
    if (logout) {
      dispatch(logoutAction());
    }
    if (error) {
      toastAlert(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, error, logout]);

  return (
    <div className="Admin-container">
      <ToastContainer
        position="top-left"
        autoClose={10000}
        theme="colored"
        closeOnClick={false}
      />
      <div>
        <Sidebar />
      </div>
      <div className="Admin-main dashboard-page">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="account-overview">
              <div>
                <p>
                  Account Balance:{" "}
                  <span style={{ color: "blue" }}>${totalAmount}</span>
                </p>
              </div>
              <div>
                <p>
                  Hi {user.name}{" "}
                  <span
                    onClick={logoutHandler}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Sign out
                  </span>
                </p>
              </div>
            </div>
            <div className="main-admin-top-row">
              <div>
                <AdminCard
                  heading={"Products"}
                  content={products && products.length}
                  link="/product/list"
                />
              </div>
              <div>
                <AdminCard
                  heading={"Orders"}
                  content={orders && orders.length}
                  link="/admin/all/orders"
                />
              </div>
              <div>
                <AdminCard
                  heading={"Users"}
                  content={Users && Users.length}
                  link="/all/users"
                />
              </div>
              <div>
                <AdminCard
                  heading={"Blogs"}
                  content={Blogs && Blogs.length}
                  link="/admin/blogs"
                />
              </div>
            </div>
            <div className="admin-main-bottom">
              <div>
                <Chart orders={orders} />
              </div>
              <div>
                <RecentOrders />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
