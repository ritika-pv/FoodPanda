const Order = require("../models/orderModel");
const MenuItem = require("../models/menuModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/addToCart");

//create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  if (order) {
    Cart.deleteMany({ user_id: req.user._id },function(err,result){
      if(err){
        console.log("error",err);
        return;
      }
      console.log("deleted",result.deletedCount,'doc');

    });
  }
  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  //finds the order with the id passed in params and than populate its user field with fname lname and email off user field
  //so it goes and fetches fname lname email from user table if that particular id appears
  const order = await Order.findById(req.params.id).populate(
    "user",
    "fname lname email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// //get all orders--Admin
// exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
//     const orders = await Order.find();
//     let totalAmount=0;//to show the total Price of orders
//     orders.forEach((order)=>{
//         totalAmount+=order.totalPrice
//     });
//     res.status(200).json({
//         success:true,
//         totalAmount,
//         orders ,
//     });
// });
