const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../controllers/middlewares/auth_middleware");

// router endpoints
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.viewUserDetails);
router.put("/update", authMiddleware, userController.updateUserDetails);
router.get(
  "/purchaseHistory",
  authMiddleware,
  userController.viewPurchaseHistory
);

module.exports = router;
