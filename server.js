require("dotenv").config();
const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const itemRouter = require("./routers/item_router");
const userRouter = require("./routers/user_router");
const paymentRouter = require("./routers/payment_router");
const cartRouter = require("./routers/cart_router");

// parse URL-encoded data from form
app.use(express.urlencoded({ extended: true }));
// handle JSON payloads sent in API requests
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// handle cors pre-flight requests
app.options("*", cors());

// Set up session middleware - for addToCart
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// API endpoint routes
app.use("/api/items", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/cart", cartRouter);


// Listener
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DataBase connected");

    // boot up app
    app.listen(port, () => {
      console.log("GitPub running on port: ", port);
    });
  })
  .catch((err) => {
    console.log("error when connecting: " + err);
  });
