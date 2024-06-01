import React, { useState, Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as IoIcons from "react-icons/io";
import * as CiIcons from "react-icons/ci";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

import NavbarMobile from "./navbarMobile";
import Search from "../main/search";
import { logoutAction } from "../../../Redux/Actions/authAction";

import "../css/Navbar.css";

const NavigationBar = () => {
  const [Searchbar, setSearchbar] = useState(false);
  const showSearchbar = () => setSearchbar(!Searchbar);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.Auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [notification] = useState()

  // logout handler
  const [logout, setLogout] = useState(false);
  const logoutHandler = () => setLogout(true);

  useEffect(() => {
    if (logout) {
      dispatch(logoutAction());
    }
  }, [dispatch, logout]);
  
  // cart box
  const [isOpen, setIsOpen] = useState(false);
  
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  // notification box
  const [isNotify, setIsNotify] = useState(false);
  
  const handleMouseEnters = () => {
    setIsNotify(true);
  };

  const handleMouseLeaves = () => {
    setIsNotify(false);
  };

  return (
    <Fragment>
      <div className="contain">
        <div className="navbar-container">
          <div className="logo-item">
            <Link to={"/"}>
              <img
                src="https://res.cloudinary.com/djljb8aby/image/upload/v1708593111/AgroHub/images/logo_lfb3zq.png"
                alt="AGRO HUB"
              />
            </Link>
          </div>
          <div className="navlinks-item">
            {Searchbar ? (
              <div className="search-bar-popup">
                <Search
                  searchForm={"search-form"}
                  searchBox={"search-box"}
                  searchBtn={"search-button"}
                  btnData={"Search"}
                />
              </div>
            ) : (
              <div className="navbar-links">
                <ul>
                  <li>
                    <Link to="/">
                      <span className={splitLocation[1] === "" ? "active" : ""}>
                        <FaIcons.FaHome /> Home
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products">
                      <span
                        className={
                          splitLocation[1] === "products" ? "active" : ""
                        }
                      >
                        <CiIcons.CiShop /> Products
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span
                        className={splitLocation[1] === "blogs" ? "active" : ""}
                      >
                        <FaIcons.FaBlogger /> Blogs
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        id="user-dropdown-sidebar"
                      >
                        <RiIcons.RiPageSeparator /> Pages
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to="/services">
                            <MdIcons.MdOutlineMiscellaneousServices /> Services
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/about">
                            <MdIcons.MdPermDeviceInformation /> About Us
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/contact/us">
                            <MdIcons.MdConnectWithoutContact /> Contact Us
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link>
                            <FaIcons.FaHandsHelping /> Help Center
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="search-item">
            {Searchbar ? (
              <button className="searchbar-close" onClick={showSearchbar}>
                <IoIcons.IoMdClose className="searchbar-close" />
              </button>
            ) : (
              <button onClick={showSearchbar}>
                <FaIcons.FaSearch />
              </button>
            )}
          </div>
          <div className="icons-item">
            <div className="msg-item">

            </div>
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
                    <Dropdown.Item onClick={() => navigate("/cart")}>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
             </div>
            <div className="cart-item">
              {cartItems.length <= 0 ? (
                <Dropdown
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  show={isOpen}
                >
                  <Dropdown.Toggle variant="light" id="user-dropdown-sidebar">
                    <button className="button-icon">
                      <span className="icon-inner">
                        <Fa6Icons.FaCartFlatbedSuitcase />
                      </span>
                    </button>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item disabled>No Products In Cart</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="user-dropdown-sidebar">
                    <button className="button-icon">
                      <span className="icon-inner">
                        <Fa6Icons.FaCartFlatbedSuitcase />
                      </span>
                      <span className="Badge">{cartItems.length}</span>
                    </button>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item disabled>
                      {cartItems.length} Itmes In Cart
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/cart")}>
                      Checkout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="navbar-btn">
            <button className="bar-icon" onClick={toggleSidebar}>
              <Fa6Icons.FaBarsStaggered />
            </button>
          </div>
          <div className="user-item">
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="user-dropdown-sidebar">
                  <Image
                    src={user.avatar.url}
                    roundedCircle
                    width="40"
                    height="40"
                    alt="User"
                  />
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
                  <br />
                  {user.role === "admin" ? (
                    <Dropdown.Item onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => navigate("/user/orders")}>
                      Orders
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button className="user-icon">
                <Link className="login-text" to={"/login"}>
                  <MdIcons.MdOutlineLogin /> LogIn
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile />
      </div>
    </Fragment>
  );
};

export default NavigationBar;
