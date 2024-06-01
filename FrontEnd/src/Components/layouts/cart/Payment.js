import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../main/Header";
import Footer from "../main/Footer";
import {
  CreateOrderAction,
  clearErrors,
} from "../../../Redux/Actions/OrderActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClearCart } from "../../../Redux/Actions/cartAction";
import { CREATE_ORDER_RESET } from "../../../Redux/Constants/OrderConstants";

const CheckoutForm = () => {
  const toastSuccess = (message) => toast.success(message);
  const toastAlert = (error) => toast.error(error);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useSelector((state) => state.Auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, message } = useSelector((state) => state.NewOrder);

  if (error) {
    toastAlert(error);
    dispatch(clearErrors());
  }
  if (message) {
    toastSuccess(message);
    dispatch(ClearCart());
    dispatch({ type: CREATE_ORDER_RESET });
    window.location.href= "/user/orders"
  }

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingCharges = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
    order.paymentMethod = orderInfo.paymentMethod;
    order.deliveryType = orderInfo.deliveryType;
  }
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post("http://localhost:8080/api/v1/payment/process", paymentData, config)
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        setErr(error.response.data.message);
      });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);

    const cardElement = elements.getElement(CardNumberElement);
    if (cartItems && shippingInfo) {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user.name,
              email: user.email,
            },
          },
        }
      );
      if (error) {
        setErr(error.message);
        setPaymentProcessing(false);
      } else {
        setPaymentSuccessful(true);
        setErr(null);
        setPaymentProcessing(false);
      }
      if (paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          payment_method: paymentIntent.payment_method,
        };
        dispatch(CreateOrderAction(order));
      }
    } else {
      setErr(
        "Shipping Address not found!! please go back and Add Shipping Address again"
      );
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer position="top-left" theme="colored" />
      <div className="checkout-form-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="text-center">Payment Information</h2>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <CardNumberElement id="cardNumber" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="cardExpiry">Expiration Date</label>
            <CardExpiryElement id="cardExpiry" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="cardCvc">CVC</label>
            <CardCvcElement id="cardCvc" className="form-control" />
          </div>
          {err && <div className="alert alert-danger">{err}</div>}
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={!stripe || paymentProcessing}
          >
            {paymentProcessing
              ? "Processing..."
              : "Pay $ " + paymentData.amount / 100}
          </button>
          {paymentSuccessful && (
            <div className="alert alert-success">Payment Successful!</div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutForm;
