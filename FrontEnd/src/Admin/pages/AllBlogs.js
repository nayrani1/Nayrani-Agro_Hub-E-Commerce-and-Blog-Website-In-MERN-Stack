import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBTypography } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";
import Loader from "../../Components/layouts/Features/Loader";
import { MdDeleteForever } from "react-icons/md";
import { DeleteBlogAction, FetchAdminBlogs, clearErrors } from "../../Redux/Actions/blogAction";
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "react-bootstrap";


const Users = () => {
    const dispatch = useDispatch();
    const tostAlert = (error) => toast.error(error);
    const toastSuccess = (message) => toast.success(message);

    const { loading, error, Blogs } = useSelector(state => state.blog);
    const { loading: load, message, error: err } = useSelector(state => state.addBlog)
    useEffect(() => {
        dispatch(FetchAdminBlogs());
        if (error) {
            tostAlert(error);
            dispatch(clearErrors())
        }
        if (err) {
            tostAlert(err);
            dispatch(clearErrors())
        }
        if (message) {
            toastSuccess(message);
            dispatch(clearErrors())
        }
    }, [dispatch, error, err, message]);

    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();
    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteBlog = (id) => {
        dispatch(DeleteBlogAction(id))
        setOpen(false)
    }
    const setBlogs = () => {
        const data = {
            columns: [
                {
                    label: "Image",
                    field: "image",
                    sort: "asc",
                },
                {
                    label: "Blog Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Title",
                    field: "title",
                    sort: "asc",
                },
                {
                    label: "Category",
                    field: "category",
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
        Blogs.forEach((blog) => {
            data.rows.push({
                image: blog.image && <img
                    src={blog.image.url}
                    alt=''
                    style={{ width: '50px', height: '50px' }} />,
                id: blog._id,
                title: blog.title,
                category: blog.category,
                actions: (
                    <><Link to={`/${blog._id}`} className="btn btn-primary">
                        <FaEdit />
                    </Link>
                        &nbsp; &nbsp;
                        <Button className="btn btn-danger" onClick={() => handleClickOpen(blog._id)} disabled={load}>
                            <MdDeleteForever />
                        </Button></>
                ),
            });
        });
        return data;
    };
    return (
        <div className="Admin-container">
            <div><Sidebar /></div>
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
                                All Blogs
                            </MDBTypography>
                            {loading ? (
                                <Loader />
                            ) : (
                                <MDBDataTable
                                    data={setBlogs()}
                                    className="px-3 py-3 box-cart"
                                    bordered
                                    striped
                                    hover
                                />
                            )}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
                                    {"Delete Alert"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to Delete This Blog!
                                        <p style={{ color: "#057c9a", fontSize: "20px" }}></p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button className="btn btn-success" onClick={handleClose} autoFocus>No</Button>
                                    <Button className="btn btn-danger" onClick={() => handleDeleteBlog(id)}>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Fragment>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
