const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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
      required: true,
      enum: {
        values: [
          "Organic Farming",
          "Genetic Engineering",
          "Permaculture",
          "Conservation Agriculture",
          "Homobiotic Turnover",
          "Animal Breeding",
        ],
      },
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name:{
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
