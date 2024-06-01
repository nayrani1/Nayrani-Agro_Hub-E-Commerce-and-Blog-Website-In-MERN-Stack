const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [25, "your full name cannot exceed 25 characters"],
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This Email is Taken by someone else"],
    validate: [validator.isEmail, "Please Enter a valid Email Address!"],
  },
  password: {
    type: String,
    minLength: [5, "Password should be more than 5 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  bio: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  d_o_b: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// encrypting or hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bycrypt.hash(this.password, 10);
});
// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};
// Return JWT  token
// always make function using function keyword for generate token besause it understand es6+
// dont use arrow function
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

// reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  /* hash and set it to resetPassWordToken*/
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  /*set token expire time*/
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
