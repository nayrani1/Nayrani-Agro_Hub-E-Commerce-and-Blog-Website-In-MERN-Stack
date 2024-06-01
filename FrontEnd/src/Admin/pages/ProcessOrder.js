import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SingleOrderAction,
  UpdateStatusAction,
  clearErrors,
} from "../../Redux/Actions/OrderActions";
import Loader from "../../Components/layouts/Features/Loader";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UPDATE_ORDER_STATUS_RESET } from "../../Redux/Constants/OrderConstants";
import Sidebar from "../components/Sidebar";
import { Button, Form } from "react-bootstrap";

const ProcessOrder = () => {
  const tostAlert = (error) => toast.error(error);
  const tostSuccess = (message) => toast.success(message);
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector((state) => state.Order);
  const { message, loading: load } = useSelector((state) => state.deleteOrder);
  const { id } = useParams();

  useEffect(() => {
    dispatch(SingleOrderAction(id));
    if (error) {
      tostAlert(error);
      dispatch(clearErrors());
    }
    if (message) {
      tostSuccess(message);
      dispatch({ type: UPDATE_ORDER_STATUS_RESET });
    }
  }, [dispatch, message, error, id]);
  const isPaid =
    order.paymentInfo && order.paymentInfo.status === "succeeded"
      ? true
      : false;
  const isDelivered =
    order.orderStatus && order.orderStatus === "delivered" ? true : false;
  const [orderStatus, setOrderStatus] = useState({});

  const UpdatStatusHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateStatusAction(id, orderStatus));
  };

  return (
    <div className="Admin-container">
      <div>
        <Sidebar />
      </div>
      <div className="Admin-main">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ToastContainer position="top-left" theme="colored" />
            <MDBContainer></MDBContainer>
            <MDBRow className="justify-content-center align-items-center">
              <MDBCol md="12">
                <MDBCard className="mb-1">
                  <MDBCardHeader>
                    <MDBTypography
                      tag="h4"
                      className="mb-0"
                      style={{ textShadow: "2px 2px 0px #ffc107" }}
                    >
                      Order Details
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBListGroup>
                      <MDBListGroupItem
                        className="mb-2 d-flex flex-direction-row justify-content-space-between"
                        style={{ gap: "10px", flexWrap: "wrap" }}
                      >
                        <div style={{ minWidth: "350px" }}>
                          <p className="fw-bold">Shipping Information</p>
                          <hr className="my-3" />{" "}
                          {order.shippingInfo && (
                            <>
                              <p>
                                <span className="fw-bold">Name: </span>
                                {order.shippingInfo.name}
                              </p>
                              <p>
                                <span className="fw-bold">phone: </span>
                                {order.shippingInfo.phone}
                              </p>
                              <p>
                                {" "}
                                <span className="fw-bold">email: </span>
                                {order.user.email}
                              </p>
                              <p>
                                <span className="fw-bold">Address: </span>
                                {order.shippingInfo.address}
                              </p>
                              <p>
                                {" "}
                                <span className="fw-bold">City/Country: </span>
                                {order.shippingInfo.city} -{" "}
                                {order.shippingInfo.country}
                              </p>
                            </>
                          )}
                        </div>
                        <div>
                          <p className="fw-bold">Order Details</p>
                          <hr className="my-3" />{" "}
                          <p>
                            <span className="fw-bold">Payment Method: </span>{" "}
                              {order.paymentMethod && order.paymentMethod}
                          </p>
                          <p>
                            <span className="fw-bold">Payment Status: </span>{" "}
                            <span style={{ color: isPaid ? "green" : "red" }}>
                              {isPaid ? "Paid" : "Not Paid"}
                            </span>
                          </p>
                          <p>
                            <span className="fw-bold">Order Status: </span>{" "}
                            <span
                              style={{ color: isDelivered ? "green" : "blue" }}
                            >
                              {order.orderStatus}
                            </span>
                          </p>
                          {order.orderStatus !== "delivered" ? (
                            <Form
                              style={{ width: "200px" }}
                              onSubmit={UpdatStatusHandler}
                            >
                              <Form.Group className="mb-3">
                                <Form.Control
                                  as="select"
                                  defaultValue={order.orderStatus}
                                  onChange={(e) =>
                                    setOrderStatus(e.target.value)
                                  }
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                </Form.Control>
                              </Form.Group>
                              <Button
                                className="btn btn-warning"
                                style={{ width: "200px" }}
                                type="submit"
                                disabled={load}
                              >
                                Update Status
                              </Button>
                            </Form>
                          ) : null}
                        </div>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBRow className="mb-2 d-flex justify-content-between align-items-center">
                <MDBTypography
                  tag="h5"
                  className="fw-bold text-muted cart-item-heading"
                  style={{ textShadow: "1px 1px 0px #00bf63" }}
                >
                  Order Items:
                </MDBTypography>
                <MDBTable align="middle">
                  <MDBTableHead>
                    <tr>
                      <th scope="col" className="pl-3">
                        Image
                      </th>
                      <th scope="col">product</th>
                      <th scope="col" className="text-center">
                        Price
                      </th>
                      <th scope="col" className="text-center">
                        Quantity
                      </th>
                      <th scope="col" className="text-center">
                        Total Price
                      </th>
                    </tr>
                  </MDBTableHead>
                  {order &&
                    order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <MDBTableBody>
                        <tr>
                          <td>
                            <img
                              src={item.image}
                              alt=""
                              style={{ width: "55px", height: "45px" }}
                              className="rounded-circle pl-1"
                            />
                          </td>
                          <td>
                            <p className="fw-bold ">{item.name}</p>{" "}
                          </td>
                          <td>
                            <p className="fw-normal text-center">
                              $ {item.price}
                            </p>
                          </td>
                          <td>
                            <p className="fw-normal text-center">
                              {item.quantity}
                            </p>
                          </td>
                          <td>
                            <p className="fw-normal text-center">
                              $ {item.price * item.quantity}
                            </p>
                          </td>
                        </tr>
                      </MDBTableBody>
                    ))}
                </MDBTable>
              </MDBRow>
            </MDBRow>
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessOrder;
