const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const User = sequelize.define("user", {
  name: DataTypes.STRING,
  avatar: DataTypes.TEXT("long"),
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { User };
