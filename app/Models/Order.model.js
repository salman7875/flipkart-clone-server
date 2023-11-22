const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Order = sequelize.define("order", {
  idProduct: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER,
  amount: DataTypes.INTEGER,
  status: DataTypes.STRING,
});

module.exports = { Order };
