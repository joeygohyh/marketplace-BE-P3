const express = require("express");
const router = express.Router();
const authMiddleware = require("../controllers/middlewares/auth_middleware");
const paymentController = require("../controllers/payment_controller");

// router endpoint
router.post('/checkout', authMiddleware, paymentController.checkout);

module.exports = router;

