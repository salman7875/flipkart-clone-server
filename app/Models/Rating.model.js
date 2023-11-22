const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Rating = sequelize.define("rating", {
  idUser: DataTypes.STRING,
  idProduct: DataTypes.STRING,
  rating: DataTypes.STRING,
  message: DataTypes.STRING,
});

Rating.sync({ force: false }).then(() => {
  console.log("Rating, yes re-sync done!");
});

module.exports = { Rating };
