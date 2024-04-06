const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const PaymentDetail = sequelize.define("payment_detail", {
  razorpay_payment_id: DataTypes.STRING,
  razorpay_order_id: DataTypes.STRING,
  razorpay_signature: DataTypes.STRING,
  idUser: DataTypes.INTEGER,
});

module.exports = { PaymentDetail };
