import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBTypography } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";
import Loader from "../../Components/layouts/Features/Loader";
import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import {
  AdminAllProducts,
  ClearErrors,
  DeleteProduct,
} from "../../Redux/Actions/ProductAction";

const Users = () => {
  const dispatch = useDispatch();
  const tostAlert = (error) => toast.error(error);
  const toastSuccess = (message) => toast.success(message);

  const { loading, error, products } = useSelector((state) => state.Products);
  const {
    loading: load,
    message,
    error: err,
  } = useSelector((state) => state.addProduct);
  useEffect(() => {
    dispatch(AdminAllProducts());
    if (error) {
      tostAlert(error);
      dispatch(ClearErrors());
    }
    if (err) {
      tostAlert(err);
      dispatch(ClearErrors());
    }
    if (message) {
      toastSuccess(message);
    }
  }, [dispatch, error, err, message]);

  const handleDeleteProduct = (id) => {
    dispatch(DeleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "Product Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
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
    products.forEach((product) => {
      data.rows.push({
        image: product.images && (
          <img
            src={product.images[0].url}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
        ),
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        actions: (
          <>
            <Link to={`/single/product/${product._id}`} className="btn btn-primary">
            <FaEye />
            </Link>
            &nbsp; &nbsp;
            <Button
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(product._id)}
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
                All Products
              </MDBTypography>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setProducts()}
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
