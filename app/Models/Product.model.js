const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  productImg: DataTypes.TEXT('long'),
  price: DataTypes.INTEGER,
  type: DataTypes.STRING,
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  idUser: DataTypes.INTEGER
});

Product.sync({ alter: true }).then(() =>
  console.log("PRODUCT, yes re-sync done!")
);

module.exports = { Product };
