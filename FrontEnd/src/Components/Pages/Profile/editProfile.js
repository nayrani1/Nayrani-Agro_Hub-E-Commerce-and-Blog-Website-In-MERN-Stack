import React, { Fragment, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile } from "../../../Redux/Actions/authAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const { user } = useSelector((state) => state.Auth);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
  const [avatar, setAvatar] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const { name, email, bio } = userDetails;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("bio", bio);
    formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
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
  const {loading, error, isUpdated, message } = useSelector(
    (state) => state.profileUpdate
  );
  useEffect(() => {
    if (error) {
      toastAlert(error);
      dispatch(clearErrors())
    }
    if (isUpdated) {
      window.location.reload();
    }
    if (message) {
      toastSuccess(message);
    }
  }, [error,dispatch, isUpdated, message]);
  return (
    <Fragment>
      <div className="mt-5">
        <ToastContainer
        position="top-left"
          theme="colored"
        />
        <div className="row d-flex">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Card>
              <Card.Body>
                <div className="position-relative">
                  <img
                    src={avatarPreview}
                    width="100"
                    height="100"
                    className="rounded-circle mb-3"
                    alt="Profile"
                  />
                </div>
                <Form className="mt-3 text-start" onSubmit={handleSubmit}>
                  {/* Placeholder form elements, update as needed */}
                  <Form.Group controlId="formName">
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Name:
                    </Form.Label>
                    <Form.Control
                      className="input-form-editprofile"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      onChange={handleChangeData}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label style={{ fontWeight: "bold" }}>
                      Email:
                    </Form.Label>
                    <Form.Control
                      className="input-form-editprofile"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChangeData}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label style={{ fontWeight: "bold" }}>Bio:</Form.Label>
                    <Form.Control
                      className="input-form-editprofile"
                      type="text"
                      id="bio"
                      name="bio"
                      placeholder=" Something About Your Self"
                      onChange={handleChangeData}
                    />
                  </Form.Group>
                  <br />
                  <div className="d-flex align-items-center">
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={handleChangeData}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                  {/* Add more form elements as needed */}
                  <button className="btn btn-warning px-4  mt-2" type="submit" disabled={loading}>
                    Update
                  </button>
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
