const Cart = require("../models/addToCart");
const catchAsyncError = require("../middleware/catchAsyncError");

module.exports = {
  addToCart: catchAsyncError(async (req, res) => {
    const item = await Cart.findOne({
      $and: [
        { user_id: req.body.user_id },
        { cart_product: req.body.cart_product },
      ],
    });
    if (item) {
      const result = await Cart.updateOne(
        {
          user_id: req.body.user_id,
          cart_product: req.body.cart_product,
        },
        { $set: { quantity: req.body.quantity } }
      );
      if (result.acknowledged === true) {
        res.status(200).json({ success: true, message: "Quantity Changed" });
      }
    } else {
      const cartItem = await Cart.create(req.body);
      res.status(200).json({ success: true, cartItem });
    }
  }),

  getCart: catchAsyncError(async (req, res) => {
    const user_id = req.params.user_id;
    const matchedCart = await Cart.find({
      user_id: user_id,
    }).populate("cart_product");
    if (matchedCart.length < 0)
      return res.status(404).json({ success: false, message: "Cart is Empty" });
    else
      return res
        .status(200)
        .json({ success: true, matchedCart, message: "Cart Data" });
  }),

  deleteCart: catchAsyncError(async (req, res) => {
    if (!req.body.user_id) {
      return res.status(400).json({ error: "user_id is missing." });
    }
    if (!req.body.cart_product) {
      return res.status(400).json({ error: "cart_product is missing." });
    }
    const result = await Cart.deleteOne({
      user_id: req.body.user_id,
      cart_product: req.body.cart_product,
    });
    if (result.deletedCount > 0) {
      return res.status(200).json({ success: "Deleted Successfully" });
    } else if (result.acknowledged === true && result.deletedCount === 0) {
      return res.status(200).json({ success: "Already Deleted" });
    }
    console.log(result, "result");
  }),
};
