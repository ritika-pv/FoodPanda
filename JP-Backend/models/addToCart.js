const mongoose = require("mongoose");

const cart = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required"],
  },
  cart_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: [true, "Menu Item Id is required"],
  },
  quantity: { type: Number, required: [true, "Enter Quantity"] },
  price: { type: Number, required: [true, "Enter Price  "] },
});
const Cart = mongoose.model("Cart", cart);
module.exports = Cart;
