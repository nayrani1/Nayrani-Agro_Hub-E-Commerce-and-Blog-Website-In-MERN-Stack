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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SingleOrderAction,
  clearErrors,
} from "../../../Redux/Actions/OrderActions";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../layouts/Features/Loader";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { MdOutlineStarRate } from "react-icons/md";

const SingleOrder = () => {
  const tostAlert = (error) => toast.error(error);
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector((state) => state.Order);
  const { id } = useParams();

  useEffect(() => {
    dispatch(SingleOrderAction(id));
    if (error) {
      tostAlert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);
  const isPaid =
    order.paymentInfo && order.paymentInfo.status === "succeeded"
      ? true
      : false;
  const isDelivered =
    order.orderStatus && order.orderStatus === "delivered" ? true : false;

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer position="top-left" theme="colored" />
          <MDBContainer></MDBContainer>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12">
              <MDBCard className="mb-4">
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
                      style={{gap: "10px", flexWrap: "wrap" }}
                    >
                      <div style={{ minWidth: "350px" }}>
                        <p className="fw-bold">Shipping Address</p>
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
                        <p className="fw-bold">Order Status</p>
                        <hr className="my-3" />{" "}
                        <p>
                          <span className="fw-bold">Payment: </span>{" "}
                          <span style={{ color: isPaid ? "green" : "red" }}>
                            {isPaid ? "Paid" : "Not Paid"}
                          </span>
                        </p>
                        <p>
                          <span className="fw-bold">Status: </span>{" "}
                          <span
                            style={{ color: isDelivered ? "green" : "blue" }}
                          >
                            {order.orderStatus}
                          </span>
                        </p>
                        <p>
                          {isDelivered
                            ? "Your Order has been delivered. Plese rate the product after use. ThankYou !"
                            : "Your Order Will Be Delivered in 3 to 4 working days."}
                        </p>
                      </div>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBRow className="mb-2 d-flex justify-content-between align-items-center">
              <MDBTypography
                tag="h5"
                className="fw-bold my1 text-muted cart-item-heading"
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
                    <th scope="col" className="text-center">
                      Review Item
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
                        <td>
                          <p className="fw-normal text-center">
                            <Link to={`/single/product/${item.product}`} style={{color:"green", fontSize:"25px"}}>
                              <MdOutlineStarRate />
                            </Link>
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
      <Footer />
    </div>
  );
};

export default SingleOrder;
