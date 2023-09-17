require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/CartModel");
const User = require("../models/UserModel");

const paymentController = {
  checkout: async (req, res) => {
    const userID = res.locals.authUserID;

    try {
      // Find the cart for the user
      const cart = await Cart.findOne({ user: userID }).populate("items.item");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Create line items for the Stripe checkout session
      const lineItems = cart.items.map((cartItem) => {
        const item = cartItem.item;
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: item.name,
              images: [item.image],
              // description: item.description, // too long to show on checkout page
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: cartItem.quantity,
        };
      });

      // Get the user's email or name
      const user = await User.findById(userID);
      const customerEmail = user.email;
      const customerName = user.name;

      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(cart.total * 100),
        currency: "sgd",
        metadata: {
          cartId: cart._id.toString(),
          customerEmail: customerEmail,
          customerName: customerName,
        },
      });

      // Create the Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/failed`,
        payment_intent_data: {
          metadata: {
            cartId: cart._id.toString(),
          },
        },
      });

      res.status(200).json({ session });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = paymentController;
