const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  productImg: DataTypes.TEXT("long"),
  price: DataTypes.INTEGER,
  discount: DataTypes.INTEGER,
  coupon: DataTypes.INTEGER,
  type: DataTypes.STRING,
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  idUser: DataTypes.INTEGER,
});

Product.sync({ alter: false })
  .then(() => console.log("PRODUCT, yes re-sync done!"))
  .catch((err) => {
    console.log("Product", err);
  });

module.exports = { Product };
