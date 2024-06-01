import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, signUpAction } from "../../../Redux/Actions/authAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../layouts/Features/CustonTitle";


const SignUp = () => {
  const toastAlert = (error) => toast.error(error);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    d_o_b: "",
    gender: "",
  });
  const { name, email, password, confirmPassword, d_o_b, gender } = userDetails;
  const [avatarPreview, setAvatarPreview] = useState("./img/user.png");
  const [avatar, setAvatar] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toastAlert(error);
      dispatch(clearErrors());
    }
    
  }, [dispatch, navigate, isAuthenticated, error]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    formData.set("email", email);
    formData.set("d_o_b", d_o_b);
    formData.set("gender", gender);
    formData.set("avatar", avatar);

    dispatch(signUpAction(formData));
  };

  const handleChangeData = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
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
       (inputName === "name" && name) ||
       (inputName === "email" && email) ||
       (inputName === "gender" && gender) ||
       (inputName === "password" && password) ||
       (inputName === "confirmPassword" && confirmPassword) ||
       (inputName === "d_o_b" && d_o_b) 
         ? "#34495e"
         : "#999999",
   });

  return (
    <div className="login-page">
                 <Title title={"Sign up- To Create Your account"} />
      <ToastContainer
        position="top-left"
        theme="colored"
      />
      <div className="login-container">
        <p className="login-heading">
          <MdIcons.MdInstallDesktop className="login-heading" /> SignUp
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
      <MdIcons.MdOutlineDriveFileRenameOutline />
      <input
        onClick={() => handleFocus('name')}
        type="text"
        id="name"
        name="name"
        placeholder="Name..."
        required
        value={name}
        onChange={handleChangeData}
        onBlur={() => handleBlur('name')}
      />
      <div className="center-line" style={inputStyle('name')}></div>
      <br />
      <MdIcons.MdAttachEmail />
      <input
        onClick={() => handleFocus('email')}
        type="email"
        id="email"
        name="email"
        required
        placeholder="Email Id..."
        value={email}
        onChange={handleChangeData}
        onBlur={() => handleBlur('email')}
      />
      <div className="center-line" style={inputStyle('email')}></div>
      <br />
      <FaIcons.FaTransgenderAlt />
      <select
        name="gender"
        required
        onChange={handleChangeData}
        onFocus={() => handleFocus('gender')}
        onBlur={() => handleBlur('gender')}
        value={gender}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="other">Other</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>
      <div className="center-line" style={inputStyle('gender')}></div>
      <br />
      <FaIcons.FaLock />
      <input
        onClick={() => handleFocus('password')}
        type="password"
        id="password"
        name="password"
        placeholder="Password..."
        value={password}
        onChange={handleChangeData}
        required
        onBlur={() => handleBlur('password')}
      />
      <div className="center-line" style={inputStyle('password')}></div>
      <br />
      <FaIcons.FaLock />
      <input
        onClick={() => handleFocus('confirmPassword')}
        type="password"
        id="confirm_password"
        name="confirmPassword"
        style={{ width: '150px' }}
        placeholder="Confirm Password..."
        required
        value={confirmPassword}
        onChange={handleChangeData}
        onBlur={() => handleBlur('confirmPassword')}
      />
      <div className="center-line" style={inputStyle('confirmPassword')}></div>
      <br />
      <MdIcons.MdDateRange />
      <input
        type="date"
        name="d_o_b"
        placeholder="1980-08-26"
        style={{ width: '150px' }}
        value={d_o_b}
        required
        onChange={handleChangeData}
        onFocus={() => handleFocus('d_o_b')}
        onBlur={() => handleBlur('d_o_b')}
      />
      <div className="center-line" style={inputStyle('d_o_b')}></div>
      <br />
      <div className="d-flex align-items-center">
        <div>
          <figure className="avatar mr-3 item-rtl">
            <img src={avatarPreview} className="rounded-circle" alt="" />
          </figure>
        </div>
        <div className="custom-file">
          <input
            type="file"
            name="avatar"
            className="custom-file-input"
            id="customFile"
            required
            accept="images/*"
            onChange={handleChangeData}
          />
          <label className="custom-file-label" htmlFor="customFile">
            Choose Avatar
          </label>
        </div>
      </div>
      <br />
      <button className="login-btn" type="submit" disabled={loading}>
        Sign Up
      </button>
      <br />
      <p style={{ textAlign: 'center', marginTop: '5px' }}>or SignUp using</p>
      <div className="login-icon-container">
        <FaIcons.FaFacebookF className="facebook-icon" />
        <FaIcons.FaGoogle className="google-icon" />
        <FaIcons.FaTwitter className="twitter-icon" />
      </div>
      <p style={{ textAlign: 'center' }}>Already Have an Account</p>
    </form>
        <div className="register-btn">
          <button onClick={() => navigate("/login")} className="register-btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
