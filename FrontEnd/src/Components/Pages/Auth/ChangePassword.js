import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, updatePassword } from "../../../Redux/Actions/authAction";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";

const ChangePassword = () => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [userDetails, setUserDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { currentPassword, newPassword, confirmNewPassword } = userDetails;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("currentPassword", currentPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(formData));
  };
  const handleChangeData = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const { loading, error, message } = useSelector(
    (state) => state.passwordUpdate
  );
  useEffect(() => {
    if (message) {
     toastSuccess(message);
     window.location.reload();
    }
    if (error) {
     toastAlert(error);
     dispatch(clearErrors());
      }
  }, [error, dispatch, message]);
  return (
    <div>
      <Header />
      <Fragment>
        <div className="container mt-5 mb-5">
          <ToastContainer
          position="top-left"
            theme="colored"
              
          />
          <div className="row d-flex justify-content-center">
            <div className="col-md-5">
            <h3 className="text-center">Change Password</h3>
              <Card>
                <Card.Body>
                  <Form className="mt-3 text-start" onSubmit={handleSubmit}>
                    {/* Placeholder form elements, update as needed */}
                    <Form.Group controlId="formName">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Current Password:
                      </Form.Label>
                      <Form.Control
                        className="input-form-editprofile"
                        type="password"
                        id="current password"
                        name="currentPassword"
                        placeholder="Current Password"
                        onChange={handleChangeData}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        New Password:
                      </Form.Label>
                      <Form.Control
                        className="input-form-editprofile"
                        type="password"
                        id="new password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChangeData}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Confirm New Password:
                      </Form.Label>
                      <Form.Control
                        className="input-form-editprofile"
                        type="password"
                        id="confirm new password"
                        name="confirmNewPassword"
                        placeholder=" Confirm New Password"
                        onChange={handleChangeData}
                      />
                    </Form.Group>
                    {/* Add more form elements as needed */}
                    <button
                      className="btn btn-warning px-4  mt-2"
                      type="submit"
                      disabled={loading}
                    >
                      update
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </Fragment>
      <Footer />
    </div>
  );
};

export default ChangePassword;
