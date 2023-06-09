const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const env = require("dotenv");
const bodyParser = require('body-parser');
env.config({ path: "config/config.env" });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Route imports

// Category
const categories = require("./routes/home_routes");
app.use("/api", categories);

// Menu
const menu = require("./routes/menu_routes");
app.use("/api", menu);
const user = require("./routes/user_routes");
app.use("/api", user);
const order = require("./routes/order_routes");
app.use("/api", order);

//State
const state = require("./routes/state_routes");
app.use("/api", state);

//City
const city = require("./routes/city_routes");
app.use("/api", city);

//Cart
const cart = require("./routes/add_to_cart_routes");
app.use("/api", cart);

// Payment Gateway
const razorpay = require("./routes/payment_route");
app.use("/api", razorpay);

// Razorpay Key
app.get("/api/get-key", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

//Middleware for error
app.use(errorHandler);

module.exports = app;
