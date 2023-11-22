const { Cart } = require("../Models/Cart.model");
const { Product } = require("../Models/Product.model");

const addToCart = async (req, res) => {
  try {
    const idProduct = req.query.id;
    const idUser = req.user.id;
    const quantity = req.query.q;
    const newCart = await Cart.create({ idProduct, idUser, quantity });
    if (!newCart) {
      return res
        .status(400)
        .json({ success: false, message: "Product not added to Cart!" });
    }
    res.status(200).json({ success: true, cart: newCart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const idUser = req.user.id;
    const cartList = await Cart.findAll({
      attributes: ["idProduct", "quantity", "createdAt", "updatedAt"],
      where: { idUser: idUser },
    });

    if (!cartList || cartList.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No cart found!" });
    }

    // Now, you can loop through the cart items and retrieve product information for each one
    const cartItems = [];
    for (const cartItem of cartList) {
      const idProduct = cartItem.dataValues.idProduct;
      const product = await Product.findOne({
        attributes: ["name", "description", "price", "productImg"],
        where: { id: idProduct },
      });
      if (product) {
        cartItems.push({
          idProduct,
          quantity: cartItem.dataValues.quantity,
          createdAt: cartItem.dataValues.createdAt,
          updatedAt: cartItem.dataValues.updatedAt,
          productInfo: product.dataValues,
        });
      }
    }
    res.status(200).json({ success: true, cart: cartItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    console.log(productId, userId);
    await Cart.destroy({ where: { idProduct: productId, idUser: userId } });
    return res.status(200).json({ success: true, message: "Cart Deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
