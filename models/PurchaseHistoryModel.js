const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const PurchaseHistory = mongoose.model(
  "PurchaseHistory",
  purchaseHistorySchema
);

module.exports = PurchaseHistory;
