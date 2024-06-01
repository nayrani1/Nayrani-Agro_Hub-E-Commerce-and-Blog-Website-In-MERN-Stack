// Navbar.js
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import "../css/Navbar.css";
import { Dropdown, Image } from "react-bootstrap";
import Search from "../main/search";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { user, isAuthenticated } = useSelector((state) => state.Auth);
  const { cartItems } = useSelector((state) => state.cart);
  // notification box
  const [notification] = useState()

  const [isNotify, setIsNotify] = useState(false);

  const handleMouseEnters = () => {
    setIsNotify(true);
  };

  const handleMouseLeaves = () => {
    setIsNotify(false);
  };
  return (
    <div className="navbar-mobile-contain">
      <div className="logo">
        <img
          src="https://res.cloudinary.com/djljb8aby/image/upload/v1708593111/AgroHub/images/logo_lfb3zq.png"
          alt="Logo"
        />
      </div>

      <div className="icons-item-mobile">
        <div className="msg-item"></div>
        <div className="notifi-item">
          {notification !== 0 ? (
            <Dropdown
              onMouseEnter={handleMouseEnters}
              onMouseLeave={handleMouseLeaves}
              show={isNotify}
            >
              <Dropdown.Toggle variant="light" id="user-dropdown-sidebar">
                <button className="button-icon">
                  <span className="icon-inner">
                    <Fa6Icons.FaBell />
                  </span>
                </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item disabled>No New Notification</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="light" id="user-dropdown-sidebar">
                <button className="button-icon">
                  <span className="icon-inner">
                    <Fa6Icons.FaBell />
                  </span>
                  <span className="Badge">{notification}</span>
                </button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item disabled>
                  {notification} Itmes In Cart
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/cart")}
                ></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="cart-item">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="user-dropdown-sidebar">
              <button className="button-icon">
                <span className="icon-inner">
                  <Fa6Icons.FaCartFlatbedSuitcase />
                </span>
                {cartItems.length <= 0 ? (
                  <div></div>
                ) : (
                  <span className="Badge">{cartItems.length}</span>
                )}
              </button>
            </Dropdown.Toggle>
            {cartItems.length <= 0 ? (
              <Dropdown.Menu>
                <Dropdown.Item>No Products In Cart</Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item disabled>
                  {cartItems.length} Items In Cart
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/cart")}>
                  Checkout
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="menu-icon" onClick={() => toggleSidebar()}>
        <FaIcons.FaBars />
      </div>

      {/* side Bar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaIcons.FaTimes /> : ""}
          </button>
        </div>
        <Search
          searchForm={"search-bar"}
          searchBox={"mb-search-input"}
          searchBtn={"mb-search-btn"}
          btnData={<FaIcons.FaSearch />}
        />
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FaIcons.FaHome />
              &nbsp; Home
            </Link>
          </li>
          <li>
            <Link to="/products">
              <FaIcons.FaBox />
              &nbsp; Products
            </Link>
          </li>
          <li>
            <Link to="/blogs">
              <FaIcons.FaBloggerB />
              &nbsp; Blogs
            </Link>
          </li>
          <li>
            <Link to="/services">
              <FaIcons.FaCog />
              &nbsp; Services
            </Link>
          </li>
          <li>
            <Link to="/about">
              <MdIcons.MdPermDeviceInformation />
              &nbsp; About us
            </Link>
          </li>
          <li>
            <Link to="/contact/us">
              <MdIcons.MdConnectWithoutContact />
              &nbsp; Contac US
            </Link>
          </li>
        </ul>

        <div className="profile-btn">
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="user-dropdown-sidebar-mobile"
              >
                <img className="user-img" src={user.avatar.url} alt="user" />
                <span>{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-menu">
                <Dropdown.Item>
                  <Image
                    src={user.avatar.url}
                    roundedCircle
                    width="40"
                    height="40"
                    alt="User"
                  />
                  <span className="ml-2">{user.name}</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/user/orders")}>
                  Orders
                </Dropdown.Item>
                <Dropdown.Item id="d-item">Profile</Dropdown.Item>
                <Dropdown.Item
                  id="d-item"
                  onClick={() => console.log("Logout clicked")}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <button className="link-btn-login">
              <Link className="login-text" to={"/login"}>
                LogIn/ Sign
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
