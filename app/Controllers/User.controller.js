const { Cart } = require("../Models/Cart.model");
const { Product } = require("../Models/Product.model");

const addToCart = async (req, res) => {
  try {
    const { id: idProduct, q: quantity } = req.query;
    const { id: idUser } = req.user;
    const sameProductExists = await Cart.findOne({
      raw: true,
      where: { idProduct },
    });
    if (sameProductExists) {
      await Cart.update({
        quantity: sameProductExists.quantity + 1,
        productQuantity: sameProductExists.productQuantity + 1,
      });
      return res.status(200).json({ success: true, message: "Added to Cart!" });
    }
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
        .status(200)
        .json({ success: false, message: "Cart is Empty!" });
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

const changeProductQuantity = async (req, res) => {
  try {
    // TAKE QUANTITY
    const { quantity, prodId } = req.query;
    // Check the quantity of that product
    const productInfo = await Cart.findOne({
      raw: true,
      attributes: ["productQuantity", "quantity"],
      where: { idProduct: prodId },
    });

    if (quantity < 1 || productInfo.productQuantity > 10) {
      return res.status(400).json({
        success: false,
        message: "You can buy the product between the range of 1 to 10",
      });
    }

    // IF VALID UPDATE THE QUANTITY
    await Cart.update(
      {
        productQuantity: Number(productInfo.productQuantity) + Number(quantity),
      },
      { where: { idProduct: prodId, idUser: req.user.id } }
    );

    await Cart.update(
      { quantity: Number(productInfo.quantity) + Number(quantity) },
      { where: { idUser: req.user.id } }
    );
    return res
      .status(200)
      .json({ success: true, message: "Successfully Added!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    await Cart.destroy({ where: { idProduct: productId, idUser: userId } });
    res.status(200).json({ success: true, message: "Cart Deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addToCart, getCart, changeProductQuantity, removeFromCart };
