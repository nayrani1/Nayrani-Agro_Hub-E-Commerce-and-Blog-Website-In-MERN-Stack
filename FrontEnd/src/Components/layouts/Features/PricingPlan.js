import React from 'react'

const PricingPlan = ({ title, price, features }) => (
    <div className="plan col-md-3 col-sm-8">
      <h2>{title}</h2>
      <p className="price">${price}</p>
      <ul className='text-center'>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button>ORDER NOW</button>
    </div>
  );
export default PricingPlan;
