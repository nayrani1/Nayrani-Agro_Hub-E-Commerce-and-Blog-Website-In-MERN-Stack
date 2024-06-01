import React, { Fragment, useState } from "react";
import Popup from "../../layouts/Features/popup";
import EditProfile from "./editProfile";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { useSelector } from "react-redux";
import Loader from "../../layouts/Features/Loader";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate= useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const {loading, user} = useSelector((state) => state.Auth);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />
          <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                <div className="profile-card p-3 py-4">
                  <div className="text-center">
                    <img
                      src={user.avatar.url}
                      width="100"
                      className="rounded-circle"
                      alt="Profile"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <span className="bg-secondary p-1 px-4 rounded text-white">
                      {user.role}
                    </span>
                    <h5 className="mt-2 mb-0">{user.name}</h5>
                    <span className="fonts">{user.email}</span>
                    <br />
                    <div className="px-4 mt-1">
                      <p style={{ fontSize: "15px" }}>{user.bio}</p>
                    </div>
                    <ul className="social-list">
                      <li>
                        <i className="fa fa-facebook"></i>
                      </li>
                      <li>
                        <i className="fa fa-dribbble"></i>
                      </li>
                      <li>
                        <i className="fa fa-instagram"></i>
                      </li>
                      <li>
                        <i className="fa fa-linkedin"></i>
                      </li>
                      <li></li>
                    </ul>
                    <div className="buttons">
                      <button className="btn btn-warning px-4" onClick={()=>navigate("/password/change")}>
                        Change Passwrod
                      </button>
                      <button
                        className="btn btn-outline-warning px-4 ms-3"
                        onClick={openPopup}
                      >
                        Edit Profile
                      </button>
                      <Popup
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        content={<EditProfile />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
