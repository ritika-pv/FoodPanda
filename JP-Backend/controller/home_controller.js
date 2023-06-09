const Category = require("../models/category");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

module.exports = {
  getCategorybySlug: catchAsyncErrors(async (req, res) => {
    const { slug } = req.params;
    //searches category name as well
    // search slug category
    const matchedCategory = await Category.findOne({
      $or: [{ category_name: { $regex: slug } }, { slug: { $regex: slug } }],
    })
      .populate({
        path: "menu_item_id",
        select: "-createdAt -modifiedAt -__v -deleted",
      })
      .select("-deleted -createdAt -modifiedAt");
    console.log(matchedCategory, "  ::matched category");
    if (matchedCategory.length == 0)
      return res.status(404).json({
        success: false,
        matchedCategory,
        message: "Category not found ",
      });
    else
      return res.status(200).json({
        success: true,
        matchedCategory,
        message: "Category found successfully",
      });
    // slug , category_name , description in future
  }),

  //Get-Category
  getCategories: catchAsyncErrors(async (req, res) => {
    const category = await Category.find().populate("menu_item_id");
    res.status(200).json({ success: true, category });
  }),

  //Create Category--Admin Only
  createCategory: catchAsyncErrors(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  }),

  //Update category--Admin

  updateCategory: catchAsyncErrors(async (req, res, next) => {
    console.log("updated category");
    let category = await Category.findById(req.params._id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }
    category = await Category.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true, //IF VALIDATORS ARE RUNNING THEN WHY MY SLUG IS NOT GETTING UPDATED ON CHANGING MY CATEGORY NAME
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      category,
    });
  }),

  //Delete category--admin only
  deleteCategory: catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params._id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }
    await category.remove();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  }),
};
