import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../main/Header";
import Footer from "../main/Footer";
import {
  CreateOrderAction,
  clearErrors,
} from "../../../Redux/Actions/OrderActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CREATE_ORDER_RESET } from "../../../Redux/Constants/OrderConstants";
import { ClearCart } from "../../../Redux/Actions/cartAction";
export default function ConfirmOrder() {
  const toastSuccess = (message) => toast.success(message);
  const toastAlert = (error) => toast.error(error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, message } = useSelector((state) => state.NewOrder);
  const [deliveryType, setDeliveryType] = useState("Standard-Delivery");
  const [paymentType, setPaymentType] = useState("");
  const deliveryCharges = deliveryType === "Standard-Delivery" ? 0 : 5;
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = itemsPrice > 500 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingPrice + deliveryCharges).toFixed(2);
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  order.itemsPrice = itemsPrice;
  order.shippingCharges = shippingPrice;
  order.taxPrice = deliveryCharges;
  order.totalPrice = totalPrice;
  order.paymentMethod = "Cash On Delivery";
  order.deliveryType =
    deliveryType === "Standard-Delivery" ? "Standard" : "Fast Delivery";

  const proceedToPayment = () => {
    if (paymentType === "VISA Payment Online") {
      const data = {
        deliveryType:
          deliveryType === "Standard-Delivery" ? "Standard" : "Fast Delivery",
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        texPrice: deliveryCharges,
        totalPrice: totalPrice,
        paymentMethod: paymentType,
      };
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
      navigate("/payment");
    }
    if (paymentType === "Cash On Delivery") {
      dispatch(CreateOrderAction(order));
    }
  };

  if (error) {
    toastAlert(error);
    dispatch(clearErrors());
  }
  if (message) {
    toastSuccess(message);
    dispatch(ClearCart());
    dispatch({ type: CREATE_ORDER_RESET });
    window.location.href = "/user/orders";
  }

  return (
    <div>
      <Header />
      <ToastContainer position="top-left" theme="colored" />
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#fff", fontFamily: "serif" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow
            className="justify-content-center align-items-center h-100"
            style={{ boxShadow: "inset 0 0 5px black" }}
          >
            <MDBCol size="12">
              <MDBRow className="g-0 mt-2 mb-2">
                <MDBCol lg="9">
                  <div className="p-2">
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <MDBTypography
                        tag="h1"
                        className="fw-bold  text-black cart-item-heading"
                        style={{ textShadow: "2px 2px 0px #ffc107" }}
                      >
                        Confirm Order
                      </MDBTypography>
                    </div>
                    <hr className="my-2" />
                    <div>
                      <MDBRow className="mb-2 d-flex justify-content-between align-items-center">
                        <MDBTable align="middle">
                          <MDBTableHead>
                            <tr>
                              <th scope="col">Sr.</th>
                              <th scope="col" className="pl-2">
                                Image &nbsp; &nbsp; product
                              </th>
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
                          {cartItems.map((item, index) => (
                            <MDBTableBody>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={item.image}
                                      alt=""
                                      style={{ width: "45px", height: "45px" }}
                                      className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                      <p className="fw-bold mb-1">
                                        {item.name}
                                      </p>{" "}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1 text-center">
                                    $ {item.price}
                                  </p>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1 text-center">
                                    {item.quantity}
                                  </p>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1 text-center">
                                    $ {item.price * item.quantity}
                                  </p>
                                </td>
                              </tr>
                            </MDBTableBody>
                          ))}
                        </MDBTable>
                      </MDBRow>
                    </div>
                  </div>
                </MDBCol>
                <MDBCol lg="3" className="bg-grey">
                  <div className="p-2">
                    <MDBTypography
                      tag="h3"
                      className="fw-bold mb-2 mt-1 text-center"
                      style={{ textShadow: "2px 2px 0px #ffc107" }}
                    >
                      Summary
                    </MDBTypography>

                    <hr className="my-4" />
                    <div className="d-flex justify-content-between mb-1">
                      <MDBTypography tag="p">items</MDBTypography>
                      <MDBTypography tag="p">{cartItems.length}</MDBTypography>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <MDBTypography tag="p" className="mb-2">
                        SubTotal
                      </MDBTypography>
                      <MDBTypography tag="p">$ {itemsPrice}</MDBTypography>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <MDBTypography tag="p" className="mb-2">
                        Shipping
                      </MDBTypography>
                      <MDBTypography tag="p">$ {shippingPrice}</MDBTypography>
                    </div>
                    <div className="mb-2 pb-2">
                      <select
                        className="select p-2 rounded bg-grey"
                        style={{
                          width: "100%",
                          border: "1px solid #dba400",
                          outline: "none",
                          boxShadow: "inset 2px 2px 3px #ffc107",
                          background: "transparent",
                          color: "#000",
                        }}
                        onChange={(e) => setDeliveryType(e.target.value)}
                      >
                        <option>Standard-Delivery</option>
                        <option>Fast-Delivery-$5.00</option>
                      </select>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between mb-4">
                      <MDBTypography tag="h6">Total</MDBTypography>
                      <MDBTypography tag="h6">$ {totalPrice}</MDBTypography>
                    </div>
                    <div className="mb-2 pb-2">
                      <select
                        className="select p-2 rounded bg-grey"
                        style={{
                          width: "100%",
                          border: "1px solid #dba400",
                          outline: "none",
                          boxShadow: "inset 2px 2px 3px #ffc107",
                          background: "transparent",
                          color: "#000",
                        }}
                        onChange={(e) => setPaymentType(e.target.value)}
                      >
                        <option>Select Payment Method</option>
                        <option>VISA Payment Online</option>
                        <option>Cash On Delivery</option>
                      </select>
                    </div>
                    {paymentType ? (
                      <button
                        className="btn btn-warning cart-checkout-btn"
                        onClick={proceedToPayment}
                      >
                        {paymentType === "Cash On Delivery"
                          ? "Place Order"
                          : "Proceed to Pay"}{" "}
                        {totalPrice}
                      </button>
                    ) : null}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </div>
  );
}
