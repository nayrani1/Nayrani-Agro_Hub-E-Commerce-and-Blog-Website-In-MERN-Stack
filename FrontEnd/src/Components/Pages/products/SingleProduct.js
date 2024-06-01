import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Row, Col, Image, Carousel, Button, Form } from "react-bootstrap";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductReview,
  ClearErrors,
  FetchSingleProduct,
} from "../../../Redux/Actions/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../layouts/Features/Loader";
import { ToastContainer, toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import { addToCart } from "../../../Redux/Actions/cartAction";
import RelatedProductCard from "./RelatedProductCard";
import Title from "../../layouts/Features/CustonTitle";
import ReactStars from "react-rating-stars-component";
import { PRODUCT_REVIEW_RESET } from "../../../Redux/Constants/ProductsConstant";
import DOMPurify from "dompurify";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const { id } = useParams();
  const tostAlert = (error) => toast.error(error);
  const tostSuccess = (success) => toast.success(success);
  // fect product from redux
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.ProductDetail
  );
  const { user } = useSelector((state) => state.Auth);
  const {
    error: reviewError,
    loading: load,
    message,
  } = useSelector((state) => state.AddReview);
  useEffect(() => {
    if (error) {
      tostAlert(error);
      dispatch(ClearErrors());
    }
    if (reviewError) {
      tostAlert(reviewError);
      dispatch(ClearErrors());
    }
    if (message) {
      tostSuccess(message);
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
    dispatch(FetchSingleProduct(id));
  }, [dispatch, message, reviewError, error, id]);

  const handleIncrement = () => {
    const max = product.stock;
    if (quantity >= max) return;
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id, quantity));
    tostSuccess("Item Added To Cart successfully");
  };
  const handleBuyNow = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  const handleToggleDescription = () => {
    setShowDescription(true);
    setShowReviews(false);
  };

  const handleToggleReviews = () => {
    setShowDescription(false);
    setShowReviews(true);
  };

  // add reviews
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleRating = (newRating) => {
    setRating(newRating);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("id", id);
    dispatch(AddProductReview(formData));
  };
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html)};
  };
  return (
    <Fragment>
      <Title
        title={"Best Organic Products in the Store, Buy and Enjoy Healthy Life"}
      />
      <Header />
      <ToastContainer position="top-left" theme="colored" />
      {loading ? (
        <Loader />
      ) : (
        <div className="mb-4 m-0">
          <Row className="row-line">
            <div>Home &gt; Products &gt; Single Product</div>
          </Row>
          <Row>
            <Col md={6} xs={12}>
              <Carousel className="single-product-slider" pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image._id}>
                      <Image
                        src={image.url}
                        alt={product.name}
                        className="single-product-slider-image"
                      />
                    </Carousel.Item>
                  ))}

                {/* Add more Carousel.Items for additional images */}
              </Carousel>
            </Col>
            <Col md={6} xs={12} className="mt-2 single-product-description">
              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "35px",
                  fontFamily: "serif",
                  marginTop: "",
                }}
              >
                {product.name}
              </p>
              <p>$ {product.price}</p>
              <div style={{ color: "#949494" }}>
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    product.shortDescription
                  )}
                />
              </div>
              <div className="mt-2">
                <span style={{ textTransform: "uppercase" }}>Seller:</span>{" "}
                <span style={{ color: "#949494" }}> {product.seller}</span>
              </div>
              <div>
                <span style={{ textTransform: "uppercase" }}>Stock:</span>{" "}
                <span style={{ color: "#949494" }}>
                  {" "}
                  {product.stock > 0 ? "In Stock" : "Out Stock"}
                </span>
              </div>
              <Rating
                value={product.ratings}
                name="half-rating-read"
                precision={0.5}
                size="medium"
                readOnly
              />
              <div style={{ color: "#949494" }}>
                ({product.totalReviews}) Persons rate this product
              </div>
              <div className="quantity-section">
                <div style={{ textTransform: "uppercase" }}>Quantity: </div>
                <div className="quantity-btns">
                  <button className="decrement-btn" onClick={handleDecrement}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button className="incriment-btn" onClick={handleIncrement}>
                    +
                  </button>
                </div>
              </div>
              <button className="single-product-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                className="single-product-add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <div className="mt-2">
                <span style={{ textTransform: "uppercase" }}>Category:</span>{" "}
                <span style={{ color: "#949494" }}> {product.category}</span>
              </div>
              {product.tags && (
                <div className="mt-2">
                  <span style={{ textTransform: "uppercase" }}>Tags:</span>
                  <span style={{ color: "#949494" }}>
                    {" "}
                    {product.tags.join(", ")}
                  </span>
                </div>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <button
                className={
                  showDescription
                    ? "active-descrip-btn"
                    : "inactive-descrip-btn"
                }
                onClick={handleToggleDescription}
              >
                Description
              </button>
              <button
                className={
                  showReviews ? "active-reviews-btn" : "inactive-review-btn"
                }
                onClick={handleToggleReviews}
              >
                Reviews ({product.totalReviews})
              </button>
            </Col>
          </Row>
          {showDescription && (
            <Row className="descript-sec">
              <Col>
                <h3 style={{ color: "#34495e" }}>Description:</h3>
                <div style={{ color: "#949494" }}>
                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      product.longDescription
                    )}
                  />
                </div>
                {/* Add more details as needed */}
              </Col>
            </Row>
          )}

          {showReviews && (
            <Row className="review-sec">
              <Col>
                <h3>Reviews</h3>
                {product.reviews.length === 0 ? (
                  <>
                    <div>There is no reviews yet</div>
                    <div>be First to review</div>
                  </>
                ) : (
                  <div>
                    <hr className="my-3" />{" "}
                    {product.reviews.map((review) => (
                      <>
                        <div key={review._id}>
                          <div>
                            <span style={{ textTransform: "capitalize" }}>
                              {review.name}
                            </span>{" "}
                            {review.createdAt && (
                              <span style={{ color: "#949494" }}>
                                {new Intl.DateTimeFormat("en", {
                                  month: "long",
                                }).format(new Date(review.createdAt))}{" "}
                                {new Date(review.createdAt).getDate()}{" "}
                                {new Date(review.createdAt).getFullYear()}
                              </span>
                            )}
                          </div>
                          <Rating
                            name="half-rating-read"
                            value={review.rating}
                            precision={0.5}
                            size="medium"
                            readOnly
                          />
                          <div style={{ color: "#949494" }}>
                            {review.comment}
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
                    you must be <span>Logged In</span> to review this product
                  </div>
                ) : (
                  <Col>
                    {message ? (
                      <div>
                        <p>Review Submitted successfully!</p>
                      </div>
                    ) : (
                      <Form onSubmit={handleSubmitReview}>
                        <h4>Add Your Review</h4>
                        <div className="d-flex flex-wrap-no-wrap">
                          <ReactStars
                            classNames="pl-2"
                            count={5}
                            onChange={handleRating}
                            size={34}
                            isHalf={true}
                            activeColor="#faaf00"
                          />
                          <h5 className="pt-3 pl-3">({rating})</h5>
                        </div>
                        <Form.Group controlId="review">
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review here"
                          />
                        </Form.Group>
                        <Button
                          variant="success"
                          type="submit"
                          disabled={load}
                          className="mt-3"
                        >
                          Submit Review
                        </Button>
                      </Form>
                    )}
                  </Col>
                )}
              </Row>
            </Row>
          )}
          <RelatedProductCard id={id} />
        </div>
      )}
      <Footer />
      <ScrollToTopButton />
    </Fragment>
  );
};

export default SingleProduct;
