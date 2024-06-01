import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import "../../layouts/css/AnimatedBg.scss";
import { useParams } from "react-router-dom";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  fetchSingleBlog,
  addNewComment,
} from "../../../Redux/Actions/blogAction";
import Loader from "../../layouts/Features/Loader";
import RecentPost from "./RecentPost";
import Title from "../../layouts/Features/CustonTitle";
import { BLOG_COMMENT_RESET } from "../../../Redux/Constants/blogConstants";
import DOMPurify from 'dompurify';

const ReadBlog = () => {
  const toastAlert = (error) => toast.error(error);
  const tostSuccess = (success) => toast.success(success);

  const { user } = useSelector((state) => state.Auth);
  const params = useParams();
  const id = params.id;
  const { blog, error, loading } = useSelector((state) => state.singleBlog);
  const {
    error: commentError,
    loading: load,
    message,
  } = useSelector((state) => state.AddComment);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toastAlert(error);
      dispatch(clearErrors());
    }
    if (commentError) {
      toastAlert(commentError);
      dispatch(clearErrors());
    }
    if (message) {
      tostSuccess(message);
      dispatch({ type: BLOG_COMMENT_RESET });
    }
    dispatch(fetchSingleBlog(id));
  }, [dispatch, error, commentError, message, id]);

  const backgroundImageUrl =
    'url("https://res.cloudinary.com/djljb8aby/image/upload/v1712885008/AgroHub/SiteAssets/pexels-vlad-che%C8%9Ban-2600219_aqtnpl.jpg")';

  const [comment, setComment] = useState("");
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("text", comment);
    formData.set("id", id);
    dispatch(addNewComment(formData));
  };

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <div>
      <ToastContainer position="top-left" theme="colored" />
      <Title title={"Blogs- Read Expert's Blogs About Daily life Farming"} />
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container fluid className="Products m-0">
            <Row
              className="product-page-top m-0"
              style={{
                backgroundImage: backgroundImageUrl,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Col md={12}>
                <h1>Home/ Blogs/ Blog Details</h1>
                <br />
                <h5>{blog && blog.title}</h5>
              </Col>
            </Row>
            <Row className="blog-container">
              <div className="col-md-9 mt-4">
                <Row>
                  <h2 className="mb-2">{blog && blog.title}</h2>
                  {blog && blog.images && <img src={blog.image.url} alt="" />}
                 <div className="mt-2">
                 <div dangerouslySetInnerHTML={createMarkup(blog.shortDescription)} />
                 </div>
                  <Row className="mt-2 mb-2 read-blog-img">
                    {blog.images &&
                      blog.images.map((image) => (
                        <Col style={{ height: "400px", minWidth:"400px" }}>
                          <img
                            src={image.url}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Col>
                      ))}
                  </Row>
                  <div dangerouslySetInnerHTML={createMarkup(blog.article)} />
                </Row>
                <Row className="review-sec">
                  <Col>
                    <h3>
                      Comments{" "}
                      <span
                        className="text-muted"
                        style={{ fontSize: "normal" }}
                      >
                        ({blog.comments && blog.comments.length})
                      </span>
                    </h3>
                    {blog.comments && blog.comments.length === 0 ? (
                      <>
                        <div>There is no Comment yet</div>
                        <div>be The First One To Comment</div>
                      </>
                    ) : (
                      <div>
                        <hr className="my-3" />{" "}
                        {blog.comments && blog.comments.map((comment) => (
                          <>
                            <div key={comment._id}>
                              <div>
                                <span style={{ textTransform: "capitalize" }}>
                                  {comment.name}
                                </span>{" "}
                                {comment.createdAt && (
                                  <span style={{ color: "#949494" }}>
                                    {new Intl.DateTimeFormat("en", {
                                      month: "long",
                                    }).format(new Date(comment.createdAt))}{" "}
                                    {new Date(comment.createdAt).getDate()}{" "}
                                    {new Date(comment.createdAt).getFullYear()}
                                  </span>
                                )}
                              </div>
                              <div style={{ color: "#949494" }}>
                                {comment.text}
                              </div>
                            </div>
                            <hr className="my-3" />{" "}
                          </>
                        ))}
                      </div>
                    )}
                  </Col>
                  <Row className="mt-4">
                    {!user ? (
                      <div>
                        you must be <span>Logged In</span> to review this
                        product
                      </div>
                    ) : (
                      <Col>
                        <Form onSubmit={handleSubmitComment}>
                          <Form.Group controlId="review">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Write your Comment"
                            />
                          </Form.Group>
                          <Button
                            variant="success"
                            type="submit"
                            className="mt-3"
                            disabled={load}
                          >
                            Submit
                          </Button>
                        </Form>
                      </Col>
                    )}
                  </Row>
                </Row>
              </div>
              <div className="col-md-3 side-Data sticky-col">
                {blog.user && (
                  <div className="sellerImage">
                    <img src={blog.user.avatar.url} alt="user" />
                  </div>
                )}
                <p>
                  We do great work in our business so that you can always see
                  the quality of our work.
                </p>
                <div className="side-data-line"></div>
                <br />
                <br />
                <h4>Recent Posts</h4>
                <div className="side-data-line-low mb-4"></div>

                <RecentPost />

                <div className="hidden-line"></div>
                <h4>Tags</h4>
                <div className="side-data-line-low"></div>
                <div className="price-range">
                  <div className="Blogs-Tags-section mt-2 mb-2">
                    <div>Live Stock</div>
                    <div>Plants</div>
                    <div>Animal Breeding</div>
                    <div>Farming</div>
                  </div>
                </div>
                <div className="side-data-line-low"></div>
                <h4>Advertizing spot</h4>
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1706033676/AgroHub/SiteAssets/image-22_ngenbo.jpg"
                  width="100%"
                  height={"200px"}
                  alt=""
                />
                <br />
              </div>
            </Row>
            <Row className="row-line"></Row>
          </Container>
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </div>
  );
};

export default ReadBlog;
