const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name required"],
      trim: true,
      maxlength: [50, "product name cannot exceed 50 characteres"],
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
   shortDescription: {
      type: String,
      required: true,
    },
    longDescription:{
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please Select Category for this Product"],
      enum: {
        values: [
          "Food",
          "Vagetables",
          "Fruits",
          "Grains",
          "Seeds",
          "Dairy",
          "LiveStock",
          "Farming Instruments",
          "Drinks"
        ],
      },
    },
    seller: {
      type: String,
      required: [true, "Seller info is required"],
    },
    stock: {
      type: Number,
      required: [true, "stock field can not be empty"],
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
    totalReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    tags:[{
      type: String,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  } /*
, {
 versionKey: false // to stop generatig __v in mongodb document 
}*/
);

const product = mongoose.model("Product", productSchema);
module.exports = product;
