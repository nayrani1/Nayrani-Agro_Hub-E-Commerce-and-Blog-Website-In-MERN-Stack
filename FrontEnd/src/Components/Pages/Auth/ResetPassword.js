import React, { Fragment, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswrod, clearErrors } from "../../../Redux/Actions/authAction";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {token} = useParams();
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(ResetPasswrod(token, formData));
  };
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    if (message) {
      toastSuccess(message);
      navigate("/");
    }
    if (error) {
      toastAlert(error);
      dispatch(clearErrors());
    }
  }, [error, message, navigate, dispatch]);
  return (
    <div>
      <Fragment>
        <div>
          <div className="animation-container">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="container mt-5 mb-5">
              <ToastContainer
                position="top-left"
                autoClose={10000}
                theme="colored"
                closeOnClick={false}
              />
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                  <Card className="card-box mt-5">
                  <h3 className="text-center mt-2">Reset Password</h3>
                    <Card.Body>
                      <Form
                        className="mt-3 text-start "
                        onSubmit={handleSubmit}
                      >
                        {/* Placeholder form elements, update as needed */}
                        <Form.Group controlId="formEmail">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            New Password:
                          </Form.Label>
                          <Form.Control
                            className="input-form-editprofile"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="New Password..."
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label style={{ fontWeight: "bold" }}>
                            Confirm New Password:
                          </Form.Label>
                          <Form.Control
                            className="input-form-editprofile"
                            type="password"
                            id="ConfirmPasswrod"
                            name="confirmPassword"
                            placeholder="Confirm Password..."
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Form.Group>
                        {/* Add more form elements as needed */}
                        <button
                          className="btn btn-warning px-4  mt-2"
                          type="submit"
                          disabled={loading}
                        >
                          Set Password
                        </button>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ResetPassword;
