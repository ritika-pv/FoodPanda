const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //built in module
const Cart = require("./addToCart");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please enter your first name"],
    maxLength: [10, "First Name cannot exceed 30 characters"],
    minLength: [2, "First Name should exceed 1 character "],
  },
  lname: {
    type: String,
    required: [true, "Please enter your last name"],
    maxLength: [10, "Last Name cannot exceed 30 characters"],
    minLength: [2, "Last Name should exceed 1 character "],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should exceed 8 characters "],
    select: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v);
      },
      message: "Invalid phone number",
    },
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.matches(v, /^[A-Za-z\s]+$/);
      },
      message: "Invalid state name",
    },
  },
  zip: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isPostalCode(v, "any");
      },
      message: "Invalid zip code",
    },
  },
  token: {
    type: String,
    default: null,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  //when  the password is updated then only it  hash
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  //compares text password to the hashed password`
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating password reset token

userSchema.methods.getResetPasswordToken = function () {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing and adding to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
