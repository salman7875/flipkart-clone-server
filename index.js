require("dotenv").config();
const express = require("express");
const { checkConnectionDB } = require("./app/Config/db");
const cors = require("cors");
const Razorpay = require("razorpay");
const app = express();

const authRoute = require("./app/Routes/Auth.route");
const productRoute = require("./app/Routes/Product.route");
const userRoute = require("./app/Routes/User.route");
const ratingRoute = require("./app/Routes/Rating.route");
const orderRoute = require("./app/Routes/Order.route");

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/rating", ratingRoute);
app.use("/order", orderRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  checkConnectionDB();
});
