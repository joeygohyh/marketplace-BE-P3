const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      name: String,
      price: Number,
      description: String,
      image: String,
      product_data: Object,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
},  
{
  timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
