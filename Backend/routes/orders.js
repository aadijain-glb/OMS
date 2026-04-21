const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const { createOrder, getUserOrders, getOrderById, getAdminOrders, updateOrderStatus } = require("../controllers/orderControllers");
const { createPaymentIntent } = require("../controllers/paymentControllers");

// Stripe
router.post("/create-payment-intent", auth, createPaymentIntent);

// User routes
router.post("/", auth, createOrder);
router.get("/user", auth, getUserOrders);
router.get("/:id", auth, getOrderById);

// Admin routes
router.get("/admin/all", auth, admin, getAdminOrders);
router.put("/:id/status", auth, admin, updateOrderStatus);

module.exports = router;
