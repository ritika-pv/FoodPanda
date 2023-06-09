const instance = require("../index");
const catchAsyncError = require("../middleware/catchAsyncError");
const OnlinePaymentDetails = require("../models/onlinePaymentDetails");


exports.checkout = catchAsyncError(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance["instance"].orders.create(options);
  order.user = req.body.userId;
  const orderDetails = await OnlinePaymentDetails.create(order);
  console.log(orderDetails);
  res.status(200).json({ success: true, orderDetails });
});
exports.paymentVerification = catchAsyncError(async (req, res, next) => {
  console.log(req.body,"verification here");
  res.status(200).json({success:true})  
});
