const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { getAllCategories, createCategory } = require("../controllers/categoryControllers");

router.get("/", getAllCategories);
router.post("/", auth, admin, createCategory);

module.exports = router;
