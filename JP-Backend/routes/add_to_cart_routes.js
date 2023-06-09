const express = require("express");
const {
  addToCart,
  getCart,
  deleteCart,
} = require("../controller/add_to_cart_controller");
const router = express.Router();

router.route("/add-to-cart").post(addToCart);
router.route("/get-cart/:user_id").get(getCart);
router.route("/delete-cart").post(deleteCart);
module.exports = router;
