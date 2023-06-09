const express = require("express");
const {
  createMenuItem,
  getMenuItems,
  updateMenuItems,
  deleteMenuItems,
} = require("../controller/menu_controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
// Create Menu Item
router
  .route("/menu/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createMenuItem);

router.route("/get-items").get(getMenuItems);

//Update Menu Items
router
  .route("/update/menu")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateMenuItems);

//Delete Menu Items  
router
  .route("/delete/menu-items")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMenuItems);
module.exports = router;
