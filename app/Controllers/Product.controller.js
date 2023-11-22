const { Op } = require("sequelize");
const { Product } = require("../Models/Product.model");

const createProduct = async (req, res) => {
  try {
    const { name, description, productImg, price, type } = req.body;
    const { id, role } = req.user;
    if (role == 0) {
      return res
        .status(401)
        .json({ success: false, message: "You are Unauthorized!" });
    }
    if (!name || !price || !productImg || !type) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory!" });
    }
    const newProduct = await Product.create({
      name,
      description,
      productImg,
      price,
      type,
      idUser: id,
    });
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { type, page, sort, filter } = req.query;
    const limit = page * 10 || 10;
    const offset = (page - 1) * 10 || 0;
    const filterPrice = Number(filter);
    ``;

    if (sort === "ASC" || sort === "DESC" || type == "") {
      const products = await Product.findAll({
        where: { type: type, price: { [Op.gte]: filterPrice } },
        limit: limit,
        offset: offset,
        order: [["price", sort]],
      });
      return res.status(200).json({ success: true, products });
    }

    if (sort === "newest" || type == "") {
      const products = await Product.findAll({
        where: { type: type, price: { [Op.gte]: filterPrice } },
        limit: limit,
        offset: offset,
        order: [["createdAt", "ASC"]],
      });
      return res.status(200).json({ success: true, products });
    }

    const products = await Product.findAll({
      where: { type: type, price: { [Op.gte]: filterPrice } },
      limit: limit,
      offset: offset,
    });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBestProducts = async (req, res) => {
  try {
    const { type } = req.query;
    const products = await Product.findAll({ where: { type: type } });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found!" });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, role } = req.user;
    console.log(id, role);
    if (role === 0) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized!" });
    }
    const updatedProduct = await Product.update(
      { ...req.body },
      {
        where: { id: req.params.id, idUser: id },
      }
    );
    if (!updatedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found!" });
    }
    res.status(200).json({ success: true, message: "Product Updated!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role === 0) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized!" });
    }
    await Product.destroy({ where: { id: req.params.id, idUser: id } });
    res
      .status(200)
      .json({ success: true, message: "Product Deleted success!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getBestProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
