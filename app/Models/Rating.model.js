const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Rating = sequelize.define("rating", {
  idUser: DataTypes.STRING,
  idProduct: DataTypes.STRING,
  rating: DataTypes.STRING,
  message: DataTypes.STRING,
});

Rating.sync({ alter: false })
  .then(() => {
    console.log("Rating, yes re-sync done!");
  })
  .catch((err) => {
    console.log("Rating: ", err);
  });

module.exports = { Rating };
