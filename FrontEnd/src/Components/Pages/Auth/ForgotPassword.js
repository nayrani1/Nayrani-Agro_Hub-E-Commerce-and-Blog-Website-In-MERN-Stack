import React, { Fragment, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgotPasswordAction } from "../../../Redux/Actions/authAction";

const ForgotPassword = () => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ForgotPasswordAction(email));
  };
  const handleChangeData = (e) => {
    setEmail(e.target.value);
  };
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    if (message) {
      toastSuccess(message);
    }
    if (error) {
      toastAlert(error);
    }
  }, [error, message]);
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
              theme="colored"
                
            />
            <div className="row d-flex justify-content-center align-items-center" >
              <div className="col-md-6">
                <h3 className="text-center">Forgot Password</h3>
                <Card className="card-box mt-5">
                  <Card.Body>
                    <Form className="mt-3 text-start " onSubmit={handleSubmit}>
                      {/* Placeholder form elements, update as needed */}
                      <Form.Group controlId="formEmail">
                        <Form.Label style={{ fontWeight: "bold"  }}>
                          Email:
                        </Form.Label>
                        <Form.Control
                          className="input-form-editprofile"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your email address..."
                          required
                          onChange={handleChangeData}
                        />
                      </Form.Group>
                      {/* Add more form elements as needed */}
                      <button
                        className="btn btn-warning px-4  mt-2"
                        type="submit"
                        disabled={loading}
                      >
                        Send Email
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

export default ForgotPassword;
