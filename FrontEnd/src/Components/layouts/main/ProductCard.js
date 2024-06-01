import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
  const [value] = useState(product.ratings);
  return (
    <div>
      <div className="product-card">
        <div className="card-image">
          <Link to={`/single/product/${product._id}`}>
            <img src={product.images[0].url} alt="Product" />
          </Link>
        </div>
        <div className="card-content">
          <h3 className="card-title">
            <Link to={`/single/product/${product._id}`}>{product.name}</Link>
          </h3>
          <div className="side-data-line-low"></div>
          <div className="card-price mt-1">
            <Link to={`/single/product/${product._id}`}>Price: {product.price}$</Link>
          </div>
          <div className='rating-product-page'>
          <Rating name="half-rating-read" value={value} size="small" precision={0.5} readOnly />
          <span>({product.totalReviews})</span>
          </div>    
          <Link to={`/single/product/${product._id}`} className='view-details-link'>    
          <button className="view-details">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
