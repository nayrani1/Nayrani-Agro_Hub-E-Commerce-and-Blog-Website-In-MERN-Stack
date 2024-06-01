const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Add new Product
exports.addNewProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const output = await cloudinary.v2.uploader.upload(images[i], {
      folder: "AgroHub/Products/",
    });
    imagesLinks.push({
      public_id: output.public_id,
      url: output.secure_url,
    });
  }
  const tagsArray = req.body.tags.split(",").map((tag) => tag.trim());
  req.body.tags = tagsArray;
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    newProduct,
  });
});

// fech all products
exports.fechAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 9;
   // Apply search and filter to count total matching products
   const totalProducts = await new APIFeatures(Product.find(), req.query)
   .search()
   .filter()
   .query.countDocuments();

const apiFeatures = new APIFeatures(Product.find(), req.query)
    .pagination(resPerPage)
    .search()
    .filter();
  const products = await apiFeatures.pagination(resPerPage).query;
  const count = products.length;
  if (count == 0) {
    return next(new ErrorHandler("No Product Found", 404));
  } else {
    setTimeout(() => {
      res.status(200).json({
        success: true,
        products,
        totalProducts, 
        resPerPage,
      });
    }, 1000);
  }
});

// fetch Admin Products
exports.fetchAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    products,
  });
});

exports.fetchProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    products,
  });
});

// related products
exports.fetchRelatedProducts = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const resPerPage = 4;

  const currentProduct = await Product.findById(productId);
  const category = currentProduct.category;

  const relatedProducts = await Product.find({
    category: category,
    _id: { $ne: productId },
  }).limit(resPerPage);

  const count = relatedProducts.length;
  // if (count === 0) {
  //   return next(new ErrorHandler('No related products found', 404));
  // }

  // Respond with the related products
  res.status(200).json({
    success: true,
    count,
    relatedProducts,
  });
});

//fetch single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);
  if (!product) {
    return next(
      new ErrorHandler(
        `The product with the given ID ${prodId} was not found.`,
        404
      )
    );
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);

  if (!product) {
    return next(
      new ErrorHandler(
        `The product with the given ID ${prodId} was not found.`,
        404
      )
    );
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const existingImageUrls = product.images.map((image) => image.url);

  // Check if the new images are the same as the existing images
  const imagesAreSame =
    images.length === existingImageUrls.length &&
    images.every((img, index) => img === existingImageUrls[index]);

  // If images are the same, remove the images field from req.body
  if (imagesAreSame) {
    delete req.body.images;
  } else if (images.length > 0) {
    // Deleting all old images of the product from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      try {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      } catch (error) {
        return next(
          new ErrorHandler(
            `Failed to delete image: ${product.images[i].public_id}`,
            500
          )
        );
      }
    }

    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      try {
        const output = await cloudinary.v2.uploader.upload(images[i], {
          folder: "AgroHub/Products/",
        });
        imagesLinks.push({
          public_id: output.public_id,
          url: output.secure_url,
        });
      } catch (error) {
        return next(
          new ErrorHandler(`Failed to upload image: ${images[i]}`, 500)
        );
      }
    }
    req.body.images = imagesLinks;
  }
  const updatedProduct = await Product.findByIdAndUpdate(prodId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product was successfully updated",
    product: updatedProduct,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);
  if (!product) {
    return next(
      new ErrorHandler(
        `The product with the given ID ${prodId} was not found.`,
        404
      )
    );
  } 
  // Deleting all images of the product from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
     await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

    await product.deleteOne();
    res.status(201).json({
      success: true,
      message: `Product deleted successfully!!`,
    });
});

// Add Product Review
exports.addProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, id } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    createdAt: Date.now(),
    comment,
  };
  const product = await Product.findById(id);
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Product Review saved successfully!"
  });
});


// Fetch Product All Reviews
exports.productAllReviews = catchAsyncErrors(async (req, res, next) => {
  const prodId = req.query.id;
  const product = await Product.findById(prodId);
  if (!product) {
    return next(
      new ErrorHandler(
        `The product with the given ID ${prodId} was not found.`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


// Delete Review
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {});
