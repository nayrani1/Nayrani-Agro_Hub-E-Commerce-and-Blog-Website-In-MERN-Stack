import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import * as IoIcons from "react-icons/io";
import * as CiIcons from "react-icons/ci";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../Features/popup";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearCart,
  addToCart,
  removeCartItem,
} from "../../../Redux/Actions/cartAction";
import Header from "../main/Header";
import Footer from "../main/Footer";
import ShippingInfo from "./Shipping";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const toastWarning = (warning) => toast.warn(warning);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleIncrement = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity >= stock) return;
    dispatch(addToCart(id, newQuantity));
  };
  const handleDecrement = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) return;
    dispatch(addToCart(id, newQuantity));
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeCartItem(id));
  };
  const handleClearCart = () => {
    dispatch(ClearCart());
    toastWarning("Your Cart has been cleared!");
    window.location.reload();
  };
  return (
    <div>
      <Header />
      <ToastContainer
        position="top-left"
        autoClose={10000}
        theme="colored"
        closeOnClick={false}
      />
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#eee", fontFamily: "serif" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12">
              <MDBCard className="mb-4">
                <MDBCardHeader>
                  <MDBTypography
                    tag="h5"
                    className="mb-0"
                    style={{ textShadow: "2px 2px 0px #ffc107" }}
                  >
                    Shipping Address
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup>
                    <MDBListGroupItem className="mb-2 d-flex justify-content-right align-items-center">
                      <div style={{ minWidth: "350px" }}>
                        <p className="fw-bold">
                          Address Book | <Link onClick={openPopup}>Edit</Link>
                        </p>
                        <p className="cart-address-type">
                          Default Delivery Address
                        </p>
                        <hr className="my-3" />
                        {shippingInfo ? (
                          <>
                            <p className="fw-bold">{shippingInfo.name}</p>
                            <p>{shippingInfo.address}</p>
                            <p>
                              {shippingInfo.city} - {shippingInfo.country}
                            </p>
                            <p>{shippingInfo.phone}</p>
                            <p>{shippingInfo.email}</p>
                          </>
                        ) : (
                          <p>Please add your Delivery Address</p>
                        )}
                      </div>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="p-0">
                  {cartItems.length <= 0 ? (
                    <MDBRow className="g-0 p-5">
                      <div>
                        <h3>Your Cart Is Empty....</h3>
                      </div>
                      <div className="pt-5">
                        <MDBTypography tag="p" className="mb-0">
                          <MDBCardText
                            onClick={() => navigate("/products")}
                            className="text-body"
                            style={{ cursor: "pointer" }}
                          >
                            <IoIcons.IoMdArrowRoundBack />
                            Back to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </MDBRow>
                  ) : (
                    <MDBRow className="g-0">
                      <MDBCol lg="9">
                        <div className="p-2">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <MDBTypography
                              tag="h2"
                              className="fw-bold mb-0 text-black cart-item-heading"
                              style={{ textShadow: "2px 2px 0px #ffc107" }}
                            >
                              Cart Items
                            </MDBTypography>
                            <MDBTypography className="mb-0 text-muted">
                              {cartItems.length} items
                            </MDBTypography>
                          </div>

                          <hr className="my-2" />
                          {cartItems.map((item) => (
                            <div>
                              <MDBRow className="mb-2 d-flex justify-content-between align-items-center">
                                <MDBCol md="2" lg="2" xl="2">
                                  <MDBCardImage
                                    src={item.image}
                                    fluid
                                    className="rounded-3"
                                    alt={item.name}
                                    style={{ width: "70px", height: "50px" }}
                                  />
                                </MDBCol>
                                <MDBCol md="4" lg="4" xl="4">
                                  <MDBTypography
                                    tag="p"
                                    className="text-black text-uppercase"
                                  >
                                    {item.name}
                                  </MDBTypography>
                                </MDBCol>
                                <MDBCol
                                  md="3"
                                  lg="3"
                                  xl="3"
                                  className="d-flex align-items-center"
                                >
                                  <div className="quantity-section">
                                    <div className="quantity-btns">
                                      <button
                                        className="decrement-btn"
                                        onClick={() =>
                                          handleDecrement(
                                            item.product,
                                            item.quantity
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <span>{item.quantity}</span>
                                      <button
                                        className="incriment-btn"
                                        onClick={() =>
                                          handleIncrement(
                                            item.product,
                                            item.quantity,
                                            item.stock
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </MDBCol>
                                <MDBCol
                                  md="3"
                                  lg="2"
                                  xl="2"
                                  className="text-end"
                                >
                                  <MDBTypography tag="p" className="mb-0">
                                    ${item.price} /{" "}
                                    {item.category === "Foods" ? "Piece" : "Kg"}
                                  </MDBTypography>
                                </MDBCol>
                                <MDBCol
                                  md="1"
                                  lg="1"
                                  xl="1"
                                  className="text-end"
                                >
                                  <a href="#!" className="text-muted">
                                    <CiIcons.CiSquareRemove
                                      style={{ fontSize: "25px", color: "red" }}
                                      onClick={() =>
                                        handleRemoveFromCart(item.product)
                                      }
                                    />
                                  </a>
                                </MDBCol>
                              </MDBRow>
                              <hr className="my-2" />
                            </div>
                          ))}

                          <div className="pt-2 d-flex justify-content-between align-items-center ">
                            <MDBTypography tag="p" className="mb-0">
                              <MDBCardText
                                onClick={() => navigate("/products")}
                                className="text-body"
                                style={{ cursor: "pointer" }}
                              >
                                <IoIcons.IoMdArrowRoundBack />
                                Back to shop
                              </MDBCardText>
                            </MDBTypography>
                            <MDBTypography tag="p" className="mb-0">
                              <MDBCardText
                                onClick={handleClearCart}
                                className="text-body"
                                style={{ cursor: "pointer" }}
                              >
                                Clear You Cart
                              </MDBCardText>
                            </MDBTypography>
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol lg="3" className="bg-grey">
                        <div className="p-3">
                          <MDBTypography
                            tag="h4"
                            className="fw-bold mb-2"
                            style={{ textShadow: "2px 2px 0px #ffc107" }}
                          >
                            Summary
                          </MDBTypography>

                          <hr className="my-2" />
                          <div className="d-flex justify-content-between mb-2">
                            <MDBTypography tag="p" className="">
                              items
                            </MDBTypography>
                            <MDBTypography tag="p">
                              {cartItems.length}
                            </MDBTypography>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <MDBTypography tag="p" className=" mb-2">
                              SubTotal
                            </MDBTypography>
                            <MDBTypography tag="p">
                              {" "}
                              {cartItems.reduce(
                                (acc, item) => acc + Number(item.quantity),
                                0
                              )}{" "}
                              (Units)
                            </MDBTypography>
                          </div>
                          <hr className="my-2" />
                          <div className="d-flex justify-content-between mb-4">
                            <MDBTypography tag="p" className="">
                              Total price
                            </MDBTypography>
                            <MDBTypography tag="p">
                              ${" "}
                              {cartItems
                                .reduce(
                                  (acc, item) =>
                                    acc + item.quantity * item.price,
                                  0
                                )
                                .toFixed(2)}
                            </MDBTypography>
                          </div>
                          {shippingInfo.address ? (
                            <button
                              className="btn btn-warning cart-checkout-btn"
                              onClick={() => navigate("/order/confirm")}
                            >
                              CheckOut
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning cart-checkout-btn"
                              onClick={openPopup}
                            >
                              Add your shipping info
                            </button>
                          )}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        content={<ShippingInfo />}
      />
    </div>
  );
}
