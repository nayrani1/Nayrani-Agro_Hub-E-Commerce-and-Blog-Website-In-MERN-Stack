const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],

  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    payment_method: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  shippingCharges: {
    type: Number,
    required: true,
    default: 0.0,
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryType:{
    type: String,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },

  deliveredAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
