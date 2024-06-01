const express = require("express");
const {
  userSignup,
  showAllUsers,
  getSingleUser,
  deleteUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getMyProfile,
  changePassword,
  updateProfile,
  changeUser,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const UserRouter = express.Router();

UserRouter.route("/user/signup").post(userSignup);
UserRouter.route("/user/login").post(loginUser);
UserRouter.route("/user/logout").get(isAuthenticatedUser, logoutUser);
UserRouter.route("/forgot/password").post(forgotPassword);
UserRouter.route("/password/reset/:token").put(resetPassword);
// admin routes
UserRouter.route("/admin/users/all").get(isAuthenticatedUser, authorizeRoles('admin'), showAllUsers);
UserRouter.route("/user/single/:id").get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser);
UserRouter.route("/admin/deleteuser/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
UserRouter.route("/admin/user/details/change/:id").put(isAuthenticatedUser, authorizeRoles('admin'), changeUser);
// profile 
UserRouter.route("/user/profile").get(isAuthenticatedUser, getMyProfile);
UserRouter.route("/user/password/change").put(isAuthenticatedUser, changePassword);
UserRouter.route("/user/profile/update").put(isAuthenticatedUser, updateProfile)
module.exports = UserRouter;
