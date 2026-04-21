const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const {profile, updateProfile, getAllUsers, getUserById, 
       blockUser, unblockUser, updateRole, getSecurityLogs} = require("../controllers/userController");

router.get("/me", auth, profile);
router.put("/me/update", auth, updateProfile);
router.get("/all", auth, admin, getAllUsers);
router.get("/:id", auth, admin, getUserById);
router.put("/:id/block", auth, admin, blockUser);
router.put("/:id/unblock", auth, admin, unblockUser);
router.put("/:id/role", auth, admin, updateRole);
router.get("/security-logs", auth, admin, getSecurityLogs);

module.exports = router;

