const express = require('express');
const { getCategories,getCategorybySlug,createCategory, updateCategory, deleteCategory } = require('../controller/home_controller');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles}=require("../middleware/auth")


router.route('/category').get(getCategories);
router.route('/category/:slug').get(getCategorybySlug);
router.route('/category/new').post(isAuthenticatedUser,authorizeRoles("admin"),createCategory);
router.route("/category/:_id").put(isAuthenticatedUser,authorizeRoles("admin"),updateCategory).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteCategory);
module.exports = router;
