// const express = require("express");
// const router = express.Router();
// const itemController = require("../controllers/item_controller");
// const cartRouter = require("./cart_router");

// // list all items in marketplace
// router.get("/", itemController.listItems);

// // // show all items in cart
// // router.get("/cart", itemController.viewCart);

// // show specific item in marketplace
// router.get("/:itemID", itemController.getItem);

// // // add specific item to cart
// // router.post("/:itemID/addToCart", itemController.addToCart);

// router.use("/cart", cartRouter);

// module.exports = router;

const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item_controller");
const cartController = require("../controllers/cart_controller");
const authMiddleware = require("../controllers/middlewares/auth_middleware");

// API endpoint routes for items

// list all items in marketplace
router.get("/", authMiddleware, itemController.listItems);

// show specific item in marketplace
router.get("/:itemID", authMiddleware, itemController.getItem);

// adding an item to the cart
router.post("/:itemID/addToCart", authMiddleware, cartController.addToCart);

module.exports = router;
