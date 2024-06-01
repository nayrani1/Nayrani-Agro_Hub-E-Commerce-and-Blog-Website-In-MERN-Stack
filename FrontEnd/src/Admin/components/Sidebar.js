import React from "react";
import "../Style.css";
import {
  FaTh,
  FaUserAlt,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaPowerOff,
  FaShopware,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { logoutAction } from "../../Redux/Actions/authAction";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";

const Sidebar = () => {
  const dispatch = useDispatch();
  const LogoutHandle = () => {
    dispatch(logoutAction());
  };
  const location = useLocation();
  const { user } = useSelector((state) => state.Auth);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/all/users",
      name: "Users",
      path2: "/a",
      icon: <FaUserAlt />,
    },
    {
      path: "/product/list",
      name: "Products",
      icon: <FaShoppingBag />,
    },
    {
      path: "/admin/product/add",
      name: "Add Product",
      icon: <FaShopware />,
    },
    {
      path: "/admin/all/orders",
      name: "Orders",
      icon: <FaCartFlatbedSuitcase />,
    },
    {
      path: "/admin/blogs",
      name: "Blogs",
      icon: <FaThList />,
    },
    {
      path: "/blog/add",
      name: "Add Blog",
      icon: <FaCommentAlt />,
    },
  ];
  return (
    <div style={{ width: "200px" }} className="admin-sidebar">
      <div className="admin-user-img">
        <Image
          src={user.avatar.url}
          roundedCircle
          width="80"
          height="80"
          alt="User"
        />
        <p>{user.name}</p>
      </div>
      {menuItem.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          className={`sidebar-link ${
            location.pathname === item.path ? "active-sidebar-link" : ""
          }`}
        >
          <div className="sidebar-icon">{item.icon}</div>
          <div className="sidebar-link_text">{item.name}</div>
        </Link>
      ))}
      <Link className={`sidebar-link`} onClick={LogoutHandle}>
        <div className="sidebar-icon">
          <FaPowerOff />
        </div>
        <div className="sidebar-link_text">Logout</div>
      </Link>
      <div className="top_section">
        <Link to={"/"}>
          <img
            style={{ width: "155px" }}
            src="https://res.cloudinary.com/djljb8aby/image/upload/v1708593111/AgroHub/images/logo_lfb3zq.png"
            className="logo"
            alt="logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
