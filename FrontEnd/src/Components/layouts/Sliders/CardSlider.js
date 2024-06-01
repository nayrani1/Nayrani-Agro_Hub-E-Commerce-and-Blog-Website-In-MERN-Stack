import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaArrowAltCircleRight , FaArrowAltCircleLeft  } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AllProducts, ClearErrors } from "../../../Redux/Actions/ProductAction";

const CardSlider = () => {
  const toastAlert = (error) => toast.error(error);
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.Products);
  useEffect(() => {
    dispatch(AllProducts());
    if (error) {
      toastAlert(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, error]);
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow custom-next" onClick={onClick}>
        <FaArrowAltCircleRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow custom-prev" onClick={onClick}>
        <FaArrowAltCircleLeft />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="custom-card-slider">
      <ToastContainer position="top-left" theme="colored" />

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="custom-card">
            <div className="card-image">
                <img src={product.images[0].url} alt="Product"/>
            </div>
            <div className="card-content">
              <h3 className="card-title">
                <Link to={`/single/product/${product._id}`}>
                  {product.name}
                </Link>
              </h3>
              <div className="side-data-line-low"></div>
              <div className="card-price mt-1">
                  Price: {product.price}$
              </div>
              <div className="rating-product-page">
                <Rating
                  name="half-rating-read"
                  value={product.ratings}
                  size="small"
                  precision={0.5}
                  readOnly
                />
                <span>({product.totalReviews})</span>
              </div>
              <Link
                to={`/single/product/${product._id}`}
                className="view-details-link"
              >
                <button className="view-details">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
