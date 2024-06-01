import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBTypography } from "mdb-react-ui-kit";
import {
  DeleteOrderAction,
  OrderByAdmin,
  clearErrors,
} from "../../Redux/Actions/OrderActions";
import Sidebar from "../components/Sidebar";
import Loader from "../../Components/layouts/Features/Loader";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { DELETE_ORDER_RESET } from "../../Redux/Constants/OrderConstants";

const Orders = () => {
  const dispatch = useDispatch();
  const tostAlert = (error) => toast.error(error);
  const toastSuccess = (message) => toast.success(message);

  const { loading, error, orders, totalAmount } = useSelector(
    (state) => state.AdminOrders
  );
  const {
    loading: load,
    error: err,
    message,
  } = useSelector((state) => state.deleteOrder);
  useEffect(() => {
    dispatch(OrderByAdmin());
    if (error) {
      tostAlert(error);
      dispatch(clearErrors());
    }
    if (err) {
      tostAlert(err);
      dispatch(clearErrors());
    }
    if (message) {
      toastSuccess(message);
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, err, message]);

  const handleDeleteOrder = (id) => {
    dispatch(DeleteOrderAction(id));
  };
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
        status: order.orderStatus ? (
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
            {order.orderStatus}
          </p>
        ) : (
          <p style={{ color: "black" }}>Unknown Status</p>
        ),
        actions: (
          <>
            <Link
              to={`/order/process/${order._id}`}
              className="btn btn-primary"
            >
              <FaEye />
            </Link>
            &nbsp; &nbsp;
            <Button
              className="btn btn-danger"
              onClick={() => handleDeleteOrder(order._id)}
              disabled={load}
            >
              <MdDeleteForever />
            </Button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <div className="Admin-container">
      <div>
        <Sidebar />
      </div>
      <div className="Admin-main">
        <ToastContainer position="top-left" theme="colored" />
        {loading ? (
          <Loader />
        ) : (
          <div>
            <Fragment className="box-cart">
              <MDBTypography
                tag="h3"
                className="fw-bold my-3 text-muted cart-item-heading text-center"
                style={{ textShadow: "1px 1px 0px #00bf63" }}
              >
                All Orders
              </MDBTypography>
              <div className="total_orders-row">
                <div>
                  <p>
                    Total Orders:{" "}
                    <span style={{ color: "Green" }}>
                      {orders && orders.length}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Total Amount:{" "}
                    <span style={{ color: "Green" }}>${totalAmount}</span>
                  </p>
                </div>
              </div>

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
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
