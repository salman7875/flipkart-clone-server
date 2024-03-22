const { Op } = require("sequelize");
const { Product } = require("../Models/Product.model");
const { Rating } = require("../Models/Rating.model");
const { User } = require("../Models/User.model");

const createRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const { message, rating } = req.body;
    if (+rating > 5 || +rating < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Rating should be between 1 to 5" });
    }

    if (!rating) {
      return res
        .status(400)
        .json({ success: false, message: "You have to give rating!" });
    }
    const newRating = await Rating.create({
      message,
      rating,
      idProduct: productId,
      idUser: userId,
    });
    res.status(201).json({ success: true, rating: newRating });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const ratings = await Rating.findAll({
      raw: true,
      attributes: ["idUser", "rating", "message", "createdAt", "updatedAt"],
      where: { idProduct: productId },
    });

    const averageRating = await Rating.aggregate("rating", "SUM", {
      where: { idProduct: productId },
    });

    let allStars = [];
    for (let i = 1; i <= 5; i++) {
      const res = await Rating.count({
        where: { rating: i, idProduct: productId },
      });
      allStars.push(res);
    }

    const userIds = ratings.map((r) => r.idUser);
    const users = await User.findAll({
      raw: true,
      where: { id: { [Op.in]: userIds } },
      attributes: ["id", "name", "avatar"],
    });
    const combinedData = ratings.map((rating) => {
      const user = users.find((user) => user.id == rating.idUser);
      return {
        ...user.dataValues,
        ...rating.dataValues,
      };
    });
    res.status(200).json({
      success: true,
      noOfRating: ratings.length,
      avgRating: averageRating / 5,
      allStars,
      ratings: combinedData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteRating = async (req, res) => {
  try {
    const userId = req.user.id;
    await Rating.destroy({ where: { idUser: userId } });
    res
      .status(200)
      .json({ success: true, message: "Message Deleted Success!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createRating, getRating, deleteRating };
