const express = require("express");
const OrderRouter = express.Router();
const { addOrder,
        fetchSingleOrder,
        fetchLoggedUserOrders,
        allOrdersAdmin,
        updateOrderStatus,
        deleteOrder,
        RecentOrdersAdmin
    } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// user routes
OrderRouter.route("/order/create").post(isAuthenticatedUser, addOrder)
OrderRouter.route("/order/single/:id").get(isAuthenticatedUser, fetchSingleOrder);
OrderRouter.route("/user/all/orders").get(isAuthenticatedUser, fetchLoggedUserOrders);
// Admin routes
OrderRouter.route("/admin/all/orders").get(isAuthenticatedUser, authorizeRoles('admin'), allOrdersAdmin);
OrderRouter.route("/admin/recent/orders").get(isAuthenticatedUser, authorizeRoles('admin'), RecentOrdersAdmin);
OrderRouter.route("/admin/update/order/status/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus);
OrderRouter.route("/admin/order/delete/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = OrderRouter;