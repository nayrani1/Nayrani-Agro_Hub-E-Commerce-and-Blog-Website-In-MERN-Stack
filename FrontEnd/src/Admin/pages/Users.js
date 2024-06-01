import { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBTypography } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";
import Loader from "../../Components/layouts/Features/Loader";
import {
  AdminAllUsers,
  DeleteUser,
  clearErrors,
} from "../../Redux/Actions/authAction";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { DELETE_USER_RESET } from "../../Redux/Constants/authConstants";

const Users = () => {
  const dispatch = useDispatch();
  const tostAlert = (error) => toast.error(error);
  const toastSuccess = (message) => toast.success(message);

  const { loading, error, Users } = useSelector((state) => state.Users);
  const {
    loading: load,
    message,
    error: err,
  } = useSelector((state) => state.deleteUser);
  useEffect(() => {
    dispatch(AdminAllUsers());
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
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, err, message]);

  const handleDeleteUser = (id) => {
    dispatch(DeleteUser(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "User Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
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
    Users.forEach((user) => {
      data.rows.push({
        image: user.avatar && (
          <img
            src={user.avatar.url}
            alt=""
            style={{ width: "50px", height: "50px", borderRadius: "30%" }}
          />
        ),

        id: user._id,
        name: user.name,
        email: user.email,
        role:
          user.role && String(user.role).includes("admin") ? (
            <p style={{ color: "green" }}> {user.role} </p>
          ) : (
            <p style={{ color: "blue" }}> {user.role}</p>
          ),
        actions: (
          <>
            <Button
              className="btn btn-danger"
              onClick={() => handleDeleteUser(user._id)}
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

export default Users;
