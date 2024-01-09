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

User.sync({ alter: false })
  .then(() => {
    console.log("USER, yes re-sync done!");
  })
  .catch((err) => {
    console.log("USER: ", err);
  });

module.exports = { User };
