import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import CheckoutForm from './Payment';
import axios from 'axios';

const Payment = () => {
  const [stripeKey, setStripKey] = useState("");
  useEffect(() => {
    const fetchStripkey = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/stripeapikey",
          { withCredentials: true }
        );
        setStripKey(data.stripeApiKey);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStripkey();
  }, []);
  return (
    <div>
      <Elements stripe={loadStripe(stripeKey)}>
      <CheckoutForm/>
      </Elements>
    </div>
  )
}

export default Payment;
