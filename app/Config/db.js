const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, process.env.DB_PASS, {
  host: "localhost",
  dialect: "mysql",
});

const checkConnectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { checkConnectionDB, sequelize };
