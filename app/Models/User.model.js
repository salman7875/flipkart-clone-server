const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");
const { Product } = require("./Product.model");

const User = sequelize.define("user", {
  name: DataTypes.STRING,
  avatar: DataTypes.TEXT('long'),
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.sync({ force: false }).then(() => {
  console.log("USER, yes re-sync done!");
});

module.exports = { User };
