const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const Order = sequelize.define("order", {
  idOrder: DataTypes.INTEGER,
  idProduct: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER,
  amount: DataTypes.INTEGER,
  status: DataTypes.STRING,
});

Order.sync({ alter: false })
  .then(() => {
    console.log("Order Table Created Success!");
  })
  .catch((err) => {
    console.log("Order: ", err);
  });

module.exports = { Order };
