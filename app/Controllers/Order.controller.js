const Razorpay = require("razorpay");
const { Cart } = require("../Models/Cart.model");
const { Op } = require("sequelize");
const { hmac_sha256 } = require("../Utils/razorpay");
const { PaymentDetail } = require("../Models/PaymentDetail.mode");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const idUser = req.user.id;
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt,
    };

    const cartList = await Cart.findAll({
      attributes: ["id"],
      where: { idUser: idUser },
    });
    const response = await razorpay.orders.create(options);
    cartList.forEach(async (list) => {
      await Cart.destroy({
        where: {
          [Op.and]: [{ id: list.id }, { idUser: idUser }],
        },
      });
    });

    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const verifySignature = async (req, res) => {
  try {
    const { order_id, payment_id, razorpay_signature } = req.body;
    const userId = req.user.id;
    await PaymentDetail.create({
      razorpay_payment_id: payment_id,
      razorpay_order_id: order_id,
      razorpay_signature,
      idUser: userId,
    });
    const generatedSignature = hmac_sha256(
      order_id + "|" + payment_id,
      process.env.KEY_SECRET
    );

    if (generatedSignature != razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment failed!" });
    }
    res.status(200).json({ success: true, message: "Payment successful!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, verifySignature };
