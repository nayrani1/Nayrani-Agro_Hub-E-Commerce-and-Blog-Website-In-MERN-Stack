const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

// checkin if user logged in or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const  {token}  = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler(
        "Please login First",
        400
      )
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new ErrorHandler("Token has expired. Please log in again.", 401)
      );
    }
    return next(new ErrorHandler("Invalid token. Please log in again.", 401));
  }
  next();
});

// handeling authorized roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Mr ${req.user.name} your role is ${req.user.role}, So you're not Allowed to access this page`,
          403
        )
      );
    }
    next();
  };
};

