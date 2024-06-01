const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { ProcessPayment, sendStripKey } = require('../controllers/PaymentController');
const PaymentRouter = express.Router();


PaymentRouter.route('/payment/process').post(isAuthenticatedUser, ProcessPayment);
PaymentRouter.route('/stripeapikey').get(isAuthenticatedUser, sendStripKey);

module.exports = PaymentRouter;