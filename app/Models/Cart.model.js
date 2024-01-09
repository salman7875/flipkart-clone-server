const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Cart = sequelize.define("cart", {
  idProduct: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  totalAmount: DataTypes.INTEGER,
});

Cart.sync({ alter: false }).then(() => {
  console.log("CART, yes re-sync done!");
});

module.exports = { Cart };
