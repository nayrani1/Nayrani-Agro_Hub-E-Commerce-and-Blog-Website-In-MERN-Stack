const express = require("express");
const BlogRouter = express.Router();
const {
     addBlog,
     updateBlog,
     fetchBlogs,
     deleteBlog,
     fetchSingleBlog,
     fetchRecentBlog,
     fetchAdminBlogs,
     AddComment
} = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// Admin Routes
BlogRouter.route("/blog/add").post(isAuthenticatedUser, authorizeRoles('admin'), addBlog);
BlogRouter.route("/blog/update/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateBlog);
BlogRouter.route("/blog/delete/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBlog);
BlogRouter.route("/admin/blog/all").get(isAuthenticatedUser, authorizeRoles('admin'), fetchAdminBlogs)

// user Routes
BlogRouter.route("/blog/single/:id").get(fetchSingleBlog)
BlogRouter.route("/recent/blog").get(fetchRecentBlog)
BlogRouter.route("/blog/all").get(fetchBlogs);
BlogRouter.route("/blog/add/Comment").put(isAuthenticatedUser, AddComment)

module.exports = BlogRouter;