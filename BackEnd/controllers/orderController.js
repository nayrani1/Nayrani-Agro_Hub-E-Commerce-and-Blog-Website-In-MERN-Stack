const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// addig the order
exports.addOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingCharges,
    taxPrice,
    totalPrice,
    orderStatus,
    deliveredAt,
    paymentMethod,
    deliveryType
  } = req.body;
  const paymentType = paymentInfo && paymentInfo.payment_method || paymentMethod ;
  const order = await Order.create({
    user: req.user.id,
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingCharges,
    taxPrice,
    totalPrice,
    orderStatus,
    deliveredAt,
    deliveryType,
    paymentMethod: paymentType,
    paidAt: Date.now(),
  });
  res.status(200).json({
    success: true,
    order,
    message: "Order Created Successfully"
  });
});

// fetch Single Order By Id
exports.fetchSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("No Orders Found With This Id", 400));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// fetch logged In User Orders
exports.fetchLoggedUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort({createdAt: -1});
  if (orders.length == 0) {
    res.status(200).json({
      success: true,
      message: "You Have No Orders Yet",
      orders: null
    })
  }
  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
    message: null
  });
});

//  fetch all order by admin
exports.allOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
//  fetch recent order by admin
exports.RecentOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate('user', "name").sort({ createdAt: -1 }).limit(5);

  res.status(200).json({
    success: true,
    orders,
  });
});

// update status of order by admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if(req.body.orderStatus === "delivered"){
    order.deliveredAt = Date.now();
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }
  order.orderStatus = req.body.orderStatus;
  await order.save();
  res.status(200).json({
    success: true,
    message: "Order Status Updated Successfully!",
  });
});

// update stock function for update the stock of product after delivered a product
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order by Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findByIdAndDelete(id);
  await order.deleteOne();
  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully!",
  });
});