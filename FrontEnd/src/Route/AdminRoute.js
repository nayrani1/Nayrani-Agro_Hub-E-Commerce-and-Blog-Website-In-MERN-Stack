import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Components/layouts/Features/Loader";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.Auth);
  if (loading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
