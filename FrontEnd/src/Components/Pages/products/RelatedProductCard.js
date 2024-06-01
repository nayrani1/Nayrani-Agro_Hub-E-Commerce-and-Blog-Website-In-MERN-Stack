import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RelatedProductCard = ({ id }) => {
  const [RelatedProducts, setRelatedProducts] = useState("");
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const api = `http://localhost:8080/api/v1/related/product/${id}`;
        const { data } = await axios.get(api, { withCredentials: true });
        setRelatedProducts(data.relatedProducts);
      } catch (error) {
        console.error("Error fetching related products:" + error.message);
      }
    };
    fetchRelatedProducts();
}, [id]);
  return (
    <div>
      <Row className="m-1">
        <h3 style={{ color: "#34495e" }}>Related Products</h3>
      </Row>
      <Row className="related-products-row">
        {RelatedProducts ? (
          RelatedProducts.map((product) => (
            <Col md={3} sm={6} sx={12}>
              <div className="product-card">
                <div className="card-image">
                  <Link to={`/single/product/${product._id}`}>
                    <img src={product.images[0].url} alt="Product" />
                  </Link>
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <Link to={`/single/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <div className="side-data-line-low"></div>
                  <div className="card-price mt-1">
                    <Link to={`/single/product/${product._id}`}>
                      Price: {product.price}$
                    </Link>
                  </div>
                  <div className="rating-product-page">
                    <Rating name="half-rating-read" value={product.ratings} precision={0.5} size="small" readOnly />
                    <span></span>
                  </div>
                  <Link
                    to={`/single/product/${product._id}`}
                    className="view-details-link"
                  >
                    <button className="view-details">View Details</button>
                  </Link>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div>
            <p style={{ color: "red", textAlign: "center" }}>
              No Related Products
            </p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default RelatedProductCard;
