const express = require("express");
const ProductRouter = express.Router();
const {
        fechAllProducts,
        addNewProduct,
        getSingleProduct,
        updateProduct,
        deleteProduct,
        addProductReview,
        productAllReviews,
        fetchRelatedProducts,
        fetchAdminProducts,
        fetchProducts
    } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//Products Routes
ProductRouter.route("/products").get(fechAllProducts);
ProductRouter.route("/products/-1").get(fetchProducts);
ProductRouter.route("/product/:id").get(getSingleProduct);
ProductRouter.route("/related/product/:id").get(fetchRelatedProducts);

// admin Routes
ProductRouter.route("/admin/product/add").post(isAuthenticatedUser, authorizeRoles('admin'), addNewProduct);
ProductRouter.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
ProductRouter.route("/admin/all/products").get(isAuthenticatedUser, authorizeRoles('admin'), fetchAdminProducts);
// product Reviews
ProductRouter.route("/product/review/add").put(isAuthenticatedUser, addProductReview);
ProductRouter.route("/product/reviews").get(isAuthenticatedUser, productAllReviews);
module.exports = ProductRouter;