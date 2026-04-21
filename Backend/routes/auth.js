const router = require("express").Router();
const { signup, login, logout, deleteMe, deleteUserByAdmin } = require("../controllers/authControllers");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const forgotPasswordLimiter = require("../middlewares/forgotPasswordLimiter");
const { forgetPassword, resetPassword, changePassword } = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/me", auth, deleteMe);
router.delete("/:id", auth, admin, deleteUserByAdmin);
router.post("/forget-password", forgotPasswordLimiter, forgetPassword);
router.post("/reset-password", forgotPasswordLimiter, resetPassword);
router.post("/change-password", auth, forgotPasswordLimiter, changePassword);



module.exports = router;
