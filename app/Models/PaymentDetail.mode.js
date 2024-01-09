const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const PaymentDetail = sequelize.define("payment_detail", {
  razorpay_payment_id: DataTypes.STRING,
  razorpay_order_id: DataTypes.STRING,
  razorpay_signature: DataTypes.STRING,
  idUser: DataTypes.INTEGER,
});

PaymentDetail.sync({ alter: false })
  .then(() => {
    console.log("Payment Details Table Created Success!");
  })
  .catch((err) => {
    console.log("Order: ", err);
  });

module.exports = { PaymentDetail };
