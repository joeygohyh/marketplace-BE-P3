const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controller");
const authMiddleware = require("../controllers/middlewares/auth_middleware");

// router.post("/add-to-cart/:itemID", authMiddleware, cartController.addToCart);
router.get("/", authMiddleware, cartController.getAllItems);
router.delete(
  "/removeFromCart/:itemID",
  authMiddleware,
  cartController.removeFromCart
);

module.exports = router;
