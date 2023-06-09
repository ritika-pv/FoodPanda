const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const catchAsyncError = require("../middleware/catchAsyncError");
//Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    fname,
    lname,
    email,
    password,
    phone,
    address,
    city,
    state,
    zip,
    role,
  } = req.body;
  const user = await User.create({
    fname,
    lname,
    email,
    password,
    phone,
    address,
    city,
    state,
    zip,
    role,
    avatar: {
      public_id: "this is sample id",
      url: "profilePicUrl",
    },
  });

  sendToken(user, 201, res); //201 = created
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user, "user ki value");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched, "pasword ki matching");

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res); //200 = everything is ok
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged Out",
  });
});

//Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // console.log("{req.protocol:: ",req.protocol);
  // console.log("{req.protocol:: ",req.get("host"))
  // console.log("{req.protocol:: ",resetToken)
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n  ${resetPasswordUrl}\n\n if you have not requested this mail ..please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Food delivery app password recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//RESET PASSWORD
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hassh
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //searching user
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //greater than
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password does not matches confirm password"),
      400
    );
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//Get User DEtails
exports.getUserDeatails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id); //as user is logged in and we have saved it in req.user
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log(req.body.oldPassword, user.password);
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid old password", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password does not matches confirm password", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//Update User Details

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  };

  //we will add cloudinary later for pics nd all

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Updated Successfully",
    user,
  });
  sendToken(user, 200, res);
});
