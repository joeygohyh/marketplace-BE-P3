const Cart = require("../models/CartModel");
const Item = require("../models/ItemModel");
const User = require("../models/UserModel");

const cartController = {
  addToCart: async (req, res) => {
    const userID = res.locals.authUserID;
    const itemID = req.params.itemID;

    try {
      const user = await User.findById(userID);
      const item = await Item.findById(itemID);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Check if the user already has a cart
      let cart = await Cart.findOne({ user: userID });

      if (!cart) {
        // If the user does not have a cart, create a new one
        cart = new Cart({ user: userID, items: [] });
      }

      // Check if the item already exists in the cart
      const existingItem = cart.items.find((item) => item.item.equals(itemID));
      if (existingItem) {
        existingItem.quantity += 1; // Increment the quantity if the item exists
      } else {
        // Create an object to store the item details in the cart
        const itemDetails = {
          item: item._id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
          quantity: 1, // Set the initial quantity to 1
        };

        // Add the item details to the cart
        cart.items.push(itemDetails);
      }

      // Update the cart total
      cart.total = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await cart.save();

      return res.json({ message: "Item added to cart", cart: cart });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllItems: async (req, res) => {
    const userID = res.locals.authUserID;

    try {
      const cart = await Cart.findOne({ user: userID }).populate("items");

      if (!cart) {
        res.statusCode = 404;
        return res.json({ error: "Cart not found" });
      }

      res.json(cart.items);
    } catch (err) {
      res.statusCode = 500;
      return res.json({ error: "Internal server error" });
    }
  },

  removeFromCart: async (req, res) => {
    const userID = res.locals.authUserID;
    const itemID = req.params.itemID;

    try {
      // Find the cart by ID
      const cart = await Cart.findOne({ user: userID });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the item in the cart
      const item = cart.items.find((item) => item.item.equals(itemID));
      if (!item) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      // Update the cart by removing the item
      cart.items = cart.items.filter((item) => !item.item.equals(itemID));
      cart.total = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await cart.save();

      return res.json({ message: "Item removed from cart" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = cartController;
