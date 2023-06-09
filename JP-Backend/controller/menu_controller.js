const Menu = require("../models/menuModel");
const Category = require("../models/category");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

module.exports = {
  //Create MenuItems --Admin Only
  createMenuItem: catchAsyncErrors(async (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    await Menu.create(req.body).then((response) => {
      Category.findById(id).then((res) => {
        res.menu_item_id.push(response._id);
        res.save();
      });
      res.status(201).json({ success: true, response });
    });
  }),
  getMenuItems: catchAsyncErrors(async (req, res, next) => {
    const items = await Menu.find().sort({ ratings: -1 });
    res.status(200).json({ success: true, items });
  }),
  //Update Menu Items --Admin Only
  updateMenuItems: catchAsyncErrors(async (req, res, next) => {
    let menu = await Menu.findById(req.body._id);
    if (!menu) {
      return next(new ErrorHandler("Menu Item not found", 404));
    }
    const newMenuData = {
      name: req.body.name,
      delivey_time: req.body.delivery_time,
      discount: req.body.discount,
      price: req.body.price,
      rating: req.body.rating,
      images: req.body.images,
    };
    const menuItem = await Menu.findByIdAndUpdate(req.body._id, newMenuData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res
      .status(200)
      .json({ success: true, message: "Updated SuccessFully", menuItem });
  }),

  deleteMenuItems: catchAsyncErrors(async (req, res, next) => {
    let menuItem = await Menu.findById(req.body._id);
    if (!menuItem) {
      return next(new ErrorHandler("Menu Item Not Found!", 404));
    }
    await menuItem.remove();

    res
      .status(200)
      .json({ success: true, message: "Menu Item Deleted", menuItem });
  }),
};
