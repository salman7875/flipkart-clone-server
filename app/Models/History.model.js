const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");

const History = sequelize.define("history", {
  cartId: DataTypes.INTEGER,
});

History.sync({ alter: false })
  .then(() => {
    console.log("History, yes re-sync done");
  })
  .catch((err) => console.log(err.message));

module.exports = { History };
