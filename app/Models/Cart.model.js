const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Cart = sequelize.define("cart", {
  idProduct: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER,
  productQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  quantity: DataTypes.INTEGER,
  totalAmount: DataTypes.INTEGER,
});

module.exports = { Cart };
