const Blog = require("../models/blogModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// Add a new blog
exports.addBlog = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const output = await cloudinary.v2.uploader.upload(images[i], {
      folder: "AgroHub/Blogs/",
    });

    imagesLinks.push({
      public_id: output.public_id,
      url: output.url,
    });
  }

  if (!req.body.image) {
    return next(new ErrorHandler("Banner Image is Required !", 400));
  }

  try {
    const imgOutput = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "AgroHub/Blogs/",
    });
    req.body.image = {
      public_id: imgOutput.public_id,
      url: imgOutput.url,
    };
  } catch (error) {
    return next(
      new ErrorHandler("Fail to upload Bannar image" + error.message, 400)
    );
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  await Blog.create(req.body);

  res.status(201).json({
    success: true,
    message: "New Blog Posted successfully",
  });
});

// Fetch all blogs
exports.fetchBlogs = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const totalBlogs = await new APIFeatures(Blog.find(), req.query)
  .search()
  .filter()
  .query.countDocuments();

  const apiFeatures = new APIFeatures(Blog.find(), req.query)
    .pagination(resPerPage)
    .search()
    .filter();

  apiFeatures.query = apiFeatures.query.populate("user", "name");

  const Blogs = await apiFeatures.query.exec();

  const count = Blogs.length;
  if (count == 0) {
    return next(new ErrorHandler("No Blog Found", 404));
  } else {
    res.status(200).json({
      success: true,
      resPerPage,
      totalBlogs,
      Blogs,
    });
  }
});
// fetch admin blogs
exports.fetchAdminBlogs = catchAsyncErrors(async (req, res, next) => {
  const Blogs = await Blog.find().sort({ created_at: -1 });
  res.status(200).json({
    success: true,
    Blogs,
  });
});

// fetch single blog by id
exports.fetchSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("user", "name avatar");
  if (!blog) {
    return next(new ErrorHandler("No Blog Found", 404));
  }
  res.status(200).json({
    success: true,
    blog,
  });
});
// Recent Blogs
exports.fetchRecentBlog = catchAsyncErrors(async (req, res, next) => {
  try {
    const recentBlog = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("user", "name");
    res.status(200).json({
      success: true,
      recentBlog,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});
// Update a blog by ID
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new ErrorHandler("No Blog Found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  // for bannar image
  const existingImage = blog.image.url;
  const imageAreSame = existingImage === req.body.image;
  if (imageAreSame) {
    delete req.body.image;
  } else {
    await cloudinary.v2.uploader.destroy(blog.image.public_id);
    const out = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "AgroHub/Blogs/",
    });
    req.body.image = {
      public_id: out.public_id,
      url: out.url,
    };
  }

  // for supported images
  const existingImages = blog.images.map((image) => image.url);
  const imagesAreSame =
    images.length === existingImages.length &&
    images.every((img, index) => img === existingImages[index]);
  if (imagesAreSame) {
    delete req.body.images;
  } else if (images.length > 0) {
    for (let i = 0; i < blog.images.length; i++) {
      try {
        await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
      } catch (error) {
        return next(
          new ErrorHandler(
            `Failed to delete older supported image: ${blog.images[i].public_id}`,
            500
          )
        );
      }
    }

    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const output = await cloudinary.v2.uploader.upload(images[i], {
        folder: "AgroHub/Blogs/",
      });

      imagesLinks.push({
        public_id: output.public_id,
        url: output.url,
      });
    }
    req.body.images = imagesLinks;
  }

  await Blog.findByIdAndUpdate(blogId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
  });
});

// Delete a blog by ID
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  for (let i = 0; i < blog.images.length; i++) {
    try {
      await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
    } catch (error) {
      return next(
        new ErrorHandler(
          `Failed to delete older supported image: ${blog.images[i].public_id}`,
          500
        )
      );
    }
  }
  try {
    await cloudinary.v2.uploader.destroy(blog.image.public_id);
  } catch (error) {
    return next(
      new ErrorHandler(
        `Failed to delete Banner image: ${blog.image.public_id}`,
        500
      )
    );
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// add comment to blog
exports.AddComment = catchAsyncErrors(async (req, res, next) => {
  const { text, id } = req.body;
  const comment = {
    user: req.user._id,
    name: req.user.name,
    createdAt: Date.now(),
    text,
  };
  const blog = await Blog.findById(id);

  const existingCommentIndex = blog.comments.findIndex(
    (comment) => comment.user.toString() === req.user._id.toString()
  );

  if (existingCommentIndex !== -1) {
    // If user has already commented, update the text of the existing comment
    blog.comments[existingCommentIndex].text = text;
  } else {
    // If user has not commented before, add new comment
    blog.comments.push(comment);
  }

  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Comment added successfully",
  });
});
