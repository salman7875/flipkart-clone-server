const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Rating = sequelize.define("rating", {
  idUser: DataTypes.STRING,
  idProduct: DataTypes.STRING,
  rating: DataTypes.STRING,
  message: DataTypes.STRING,
});

module.exports = { Rating };
