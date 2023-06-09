const express=require("express");
const { registerUser,
        loginUser,
        logout,
        forgotPassword,
        resetPassword,
        getUserDeatails, 
        updatePassword, 
        updateProfile} = require("../controller/user_controller");
const{isAuthenticatedUser,authorizedRoles}=require("../middleware/auth");
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)//using mail
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser,getUserDeatails);
router.route("/password/update").patch(isAuthenticatedUser,updatePassword);
router.route("/me/update").patch(isAuthenticatedUser,updateProfile);
module.exports=router;