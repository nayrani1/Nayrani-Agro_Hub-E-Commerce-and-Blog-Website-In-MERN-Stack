import { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layouts/Features/Loader";
import { FaEye } from "react-icons/fa";

import {
  GetOrdersAction,
  clearErrors,
} from "../../../Redux/Actions/OrderActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { MDBTypography } from "mdb-react-ui-kit";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tostAlert = (error) => toast.error(error);

  const { loading, error, message, orders } = useSelector(
    (state) => state.Orders
  );
  useEffect(() => {
    dispatch(GetOrdersAction());
    if (error) {
      tostAlert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: order.orderStatus && (
          <p
            style={{
              color:
                order.orderStatus === "pending"
                  ? "red"
                  : order.orderStatus === "processing"
                  ? "#5BABCA"
                  : order.orderStatus === "shipped"
                  ? "blue"
                  : order.orderStatus === "delivered"
                  ? "green"
                  : "black",
            }}
          >
            {" "}
            {order.orderStatus}{" "}
          </p>
        ),
        actions: (
          <Link to={`/user/order/${order._id}`} className="btn btn-primary">
            <FaEye />
          </Link>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ToastContainer position="top-left" theme="colored" />
          {message ? (
            <div>
              <div className="empty-order-container">
                <div className="illustration">
                  <img
                    src="https://res.cloudinary.com/djljb8aby/image/upload/v1716581520/AgroHub/SiteAssets/Picsart_24-05-25_01-10-17-551_mrqevv.png"
                    width={200}
                    height={200}
                    alt="illustration"
                    style={{ backgroundColor: "transparent" }}
                  />
                </div>
                <div className="empty-order-content">
                  <h1 className="empty-title">Empty</h1>
                  <h2 className="empty-subtitle">Ther is no order yet</h2>
                  <p className="empty-description">
                    No order found! Kindly Go to Products Store or try to order
                    something
                  </p>
                  <button
                    className="home-button"
                    onClick={() => navigate("/products")}
                  >
                    Go To Store
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Fragment className="box-cart">
              <MDBTypography
                tag="h3"
                className="fw-bold my-3 text-muted cart-item-heading text-center"
                style={{ textShadow: "1px 1px 0px #00bf63" }}
              >
                My Orders
              </MDBTypography>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setOrders()}
                  className="px-3 py-3 box-cart"
                  bordered
                  striped
                  hover
                />
              )}
            </Fragment>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyOrders;
