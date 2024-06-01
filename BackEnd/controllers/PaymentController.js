const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51OPI9oAo8HRirxgMupGh1n5BhDdV91znrxBQYRYxjnvndKOFD5DEP84UOHGt005wCbNNCRjOaPu9ga1XjVMYCm7h002X0CKwst');

exports.ProcessPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler("Stripe is not loading" + error.message, 500)) // Passes errors to the error handling middleware
  }
});

exports.sendStripKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
