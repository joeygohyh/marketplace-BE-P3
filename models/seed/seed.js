require("dotenv").config("../../.env");
const mongoose = require("mongoose");
const ItemModel = require("../ItemModel");

// import data to be seeded in db
const ItemsRaw = require("../items"); // -> array of product items

// make a connection to db
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(async () => {
    console.log("seeding db");

    // insert into database using created model
    const seedResult = await ItemModel.insertMany(ItemsRaw);

    console.log(seedResult);

    mongoose.disconnect();
  })
  .catch((err) => {
    console.log("failed to seed the data");
  });
