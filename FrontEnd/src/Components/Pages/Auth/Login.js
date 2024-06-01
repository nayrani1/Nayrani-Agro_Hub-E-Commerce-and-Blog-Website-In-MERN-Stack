import React, { useEffect, useState } from "react";
import * as TbIcon from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, loginAction } from "../../../Redux/Actions/authAction";
import Loader from "../../layouts/Features/Loader";
import Title from "../../layouts/Features/CustonTitle";

const Login = () => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const SignUp_page = useNavigate();

  // login logic
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.Auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      toastSuccess("You have Successfully logged in");
      navigate(-1);
    }
    if (error){
      toastAlert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, isAuthenticated, error]);
  //   login handler for authentication
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  // handle line colors of input fields
  const [activeInput, setActiveInput] = useState(null);

  const handleFocus = (inputName) => {
    setActiveInput(inputName);
  };

  const handleBlur = (inputName, value) => {
    if (value === "") {
      setActiveInput(null);
    }
  };
  const inputStyle = (inputName) => ({
    backgroundColor:
      activeInput === inputName ||
      (inputName === "email" && email) ||
      (inputName === "password" && password)
        ? "#00bf63"
        : "#999999",
  });
  return (
    <>
               <Title title={"Login to Explore Best Parts"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="login-page">
          <ToastContainer position="top-left" theme="colored" />
          <div className="login-container">
            <p className="login-heading">
              <TbIcon.TbLogin2 className="login-heading" onClick={()=>navigate(-1)}/> Login
            </p>
            <form className="login-form" onSubmit={loginHandler}>
              <label htmlFor="email">Username or Email:</label>
              <br />
              <FaIcons.FaUser />
              <input
                onClick={() => handleFocus("email")}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => handleBlur("email", e.target.value)}
              />
              <div className="center-line" style={inputStyle("email")}></div>
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <FaIcons.FaLock />
              <input
                onClick={() => handleFocus("password")}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => handleBlur("password", e.target.value)}
              />
              <div className="center-line" style={inputStyle("password")}></div>
              <Link
                to={"/password/forgot"}
                style={{ color: "red", float: "right", marginBottom: "5px" }}
              >
                Forgot Password?
              </Link>
              <br />
              <button
                className="login-btn"
                type="submit"
                disabled={loading}
              >
                Log In
                <span></span>
              </button>
              <br />
              <p style={{ textAlign: "center", marginTop: "5px" }}>
                or login using
              </p>
              <div className="login-icon-container">
                <FaIcons.FaFacebookF className="facebook-icon" />
                <FaIcons.FaGoogle className="google-icon" />
                <FaIcons.FaTwitter className="twitter-icon" />
              </div>
              <p style={{ textAlign: "center" }}>or Register here</p>
            </form>
            <div className="register-btn">
              <button
                onClick={() => SignUp_page("/signup")}
                className="register-btn"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
