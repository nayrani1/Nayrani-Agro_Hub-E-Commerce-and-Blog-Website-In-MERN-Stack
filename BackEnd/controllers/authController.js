const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sentToken = require("../utils/jsonWebToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Signup User Controller
exports.userSignup = catchAsyncErrors(async (req, res, next) => {
  const output = await cloudinary.v2.uploader.upload_large(req.body.avatar, {
    folder: "AgroHub/Users/"
  });
  const { name, email, password, confirmPassword, d_o_b, gender } = req.body;
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Passwords do not match with each other!", 400)
    );
  }
  const user = await User.create({
    name,
    email,
    password,
    d_o_b,
    gender,
    avatar: {
      public_id: output.public_id,
      url: output.secure_url,
    },
  });
  sentToken(user, 201, res);
});

// Login User Controller
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email Or Password", 400));
  }
  // Finding user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  // check if password is matched or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Email or Password", 401));
  }
  sentToken(user, 201, res);
});



// forgot or reset password token
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new ErrorHandler("No User Found with this Email Address!", 400)
    );
  }
  // get token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // generate reset Password url
  // after doploying use this
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;
//  for now 
  const resetUrl = `${process.env.UI_HOST_NAME}/password/reset/${resetToken}`;
  const message = `Your password reset token is as follow: \n\n${resetUrl}\n\n if you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `AgroHub Password Recovery mail`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ valdiateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({ resetPasswordToken });
  if (!user) {
    return next(
      new ErrorHandler(
        "Invalid Token. Please Request New Token",
        400
      )
    );
  }
  if (Date.now() > user.resetPasswordExpire.getTime()) {
    return next(new ErrorHandler("Token is expired, please Request New Email again.", 400));
  }
  // if (req.body.password === user.password) {
  //   return next(new ErrorHandler("New and old passwords cannot be the same!", 400));
  // }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed Successfully!",
  });
});

// logout User Controller
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Already logged out!",
    });
  }
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
});

// fech profile of loggedIn user
exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  /* Check Current Password is Correct or Not */
  const isMatchedPassword = await user.comparePassword(currentPassword);
  if (!isMatchedPassword) {
    return next(
      new ErrorHandler(
        "Your Password is incorrect! Try Again with Valid Password",
        400
      )
    );
  }
  /*passwords fiels should not empty*/
  if(newPassword === "" || confirmNewPassword === "" ){
    return next(
      new ErrorHandler(
        "Please Enter New and Confirm New Passwords",
        400
      )
    );
  }
/* New and Confirm New Passwords are the Same Or not?*/
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler(
        "Confirm New Password Does not Match to Your New Password!",
        400
      )
    );
  }
  if (newPassword == currentPassword) {
    return next(
      new ErrorHandler(
        "You Can't use same Password! Please use Unique One",
        400
      )
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    isUpdated: true,
    message: "Password Changed Successfully!",
  })
});

// update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => { 
  if(req.body.name === ""){
    delete req.body.name;
  }
  if(req.body.email === ""){
    delete req.body.email;
  }
  if(req.body.bio === ""){
    delete req.body.bio;
  }
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
  };
if(req.body.avatar !==""){
  const user = await User.findById(req.user.id);
  const image_id= user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);
  const output = await cloudinary.v2.uploader.upload_large(req.body.avatar, {
    folder: "AgroHub/Users/",
  });
  newUserData.avatar = {
    public_id: output.public_id,
    url: output.secure_url,
  };
}
   
  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    isUpdated: true,
    message: "Profile Updated Successfully!",
  });
});

/*Admin Routes */
// Show All Users
exports.showAllUsers = catchAsyncErrors(async (req, res, next) => {
    // Find all users except those with the role 'admin'
  const Users = await User.find({ role: { $ne: 'admin' } });
    res.status(200).json({
      success: true,
      Users,
    });
});

// Get Single User by ID
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  const singleUser = await User.findById(userId);
  if (!singleUser) {
    return next(new ErrorHandler(`User with id ${userId} not found`, 400));
  }
  res.status(200).json({
    success: true,
    data: singleUser,
  });
});

// change user Details by admin
exports.changeUser = catchAsyncErrors(async (req, res, next) => {
  const newDate = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});

// Delete A User
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler(`Not Found User with this Id `));
  }
  try{
    await cloudinary.v2.uploader.destroy(user.image.public_id)
  }catch(error){
    return next(new ErrorHandler("Fail to Destroy User image " + error.message, 400));
  }
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: `The User With Id ${userId} has been deleted Successfully!`,
  });
});
