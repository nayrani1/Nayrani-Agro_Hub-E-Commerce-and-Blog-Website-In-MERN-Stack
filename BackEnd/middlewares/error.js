const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err, //or only err
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }; /// Here (...) is spread operator which is used to spread the arry and prevent overwriting of values
    error.message = err.message;
    // handeling mongoose id error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    // handeling validaton error // if do not put in required fields of mongoose.schema
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
    // handeling Duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }
    /* Handling wrong JWT token Error */
    if (err.name == "JsonWebTokenError") {
      const message = `JSON Web Token is invalid. Try Again!!!`;
      error = new ErrorHandler(message, 400);
    }

    /* Handling Expired JWT token Error */
    if (err.name == "TokenExpiredError") {
      const message = `JSON Web Token is expired. Try Again!!!`;
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    // to see error stack in console
    // console.error(err.stack);
    // console.error(err);

  }
};
