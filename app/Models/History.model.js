const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const History = sequelize.define("history", {
  cartId: DataTypes.INTEGER,
});

module.exports = { History };
