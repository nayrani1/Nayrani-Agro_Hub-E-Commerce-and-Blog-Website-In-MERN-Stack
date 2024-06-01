import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom'
import Loader from "../Components/layouts/Features/Loader"
const ProtectedRoute = () => {
  const {loading, isAuthenticated } = useSelector((state) => state.Auth);
if(loading){
  return <Loader/>
}
return (
    <div>
     {isAuthenticated ? <Outlet/> : <Navigate to="/login"/> }
 </div>
  );
};

export default ProtectedRoute;
