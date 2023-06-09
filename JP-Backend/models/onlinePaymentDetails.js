const mongoose = require("mongoose");

const onlinePaymentSchema = new mongoose.Schema({
  id: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  entity: { type: String },
  amount: { type: Number },
  amount_paid: { type: Number },
  amount_due: { type: Number },
  currency: { type: String },
  receipt: { type: String },
  offer_id: { type: String },
  status: { type: String },
  attempts: { type: Number },
  notes: [{ type: String }],
  created_at: { type: Date },
});
module.exports = mongoose.model("OnlinePaymentDetails", onlinePaymentSchema);
