const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, requires: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },

  orderItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      images: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
      _id: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItem",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: { type: Date, default: Date.now },
  totalPrice: { type: Number, default: 0, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
