const Item = require("../models/ItemModel");

const controllers = {
  listItems: async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getItem: async (req, res) => {
    const itemID = req.params.itemID;
    try {
      const item = await Item.findById(itemID);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.json(item);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = controllers;
