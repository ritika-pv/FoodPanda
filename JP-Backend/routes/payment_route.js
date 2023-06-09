const express = require("express");
const {
  checkout,
  paymentVerification,
} = require("../controller/payment_controller");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/payment").post(isAuthenticatedUser, checkout);
router.route("/payment-verification").post(paymentVerification);
module.exports = router;
