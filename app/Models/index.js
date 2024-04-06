const { Cart } = require("./Cart.model");
const { History } = require("./History.model");
const { Order } = require("./Order.model");
const { PaymentDetail } = require("./PaymentDetail.mode");
const { Product } = require("./Product.model");
const { Rating } = require("./Rating.model");
const { User } = require("./User.model");

const models = {
  User,
  Product,
  Rating,
  Cart,
  Order,
  PaymentDetail,
  History,
};

const flag = false;

const syncAllTables = async (models) => {
  if (flag) {
    try {
      for (const [modelName, model] of Object.entries(models)) {
        await model.sync({ alter: flag });
        console.log(`${modelName} Table syncronized successfully!`);
      }
    } catch (Err) {
      console.error("Unable to synchronize tables:", error);
    }
  }
};

syncAllTables(models);
