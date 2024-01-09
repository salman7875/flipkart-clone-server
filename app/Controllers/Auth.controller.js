const { User } = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, avatar, email, password, role } = req.body;
    if (!name || !avatar || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory!" });
    }
    const userExist = await User.findOne({ where: { email: email } });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User with this email Already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SEC
    );
    res.status(201).json({ success: true, user: newUser, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory!" });
    }
    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "No user found!" });
    }
    if (!(await bcrypt.compare(password, userExist.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: userExist.id, role: userExist.role },
      process.env.JWT_SEC
    );
    res.status(200).json({ success: true, user: userExist, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { newPassword, repeatPassword } = req.body;
    if (!newPassword || !repeatPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory!" });
    }
    if (newPassword !== repeatPassword) {
      return res.status(400).json({
        success: false,
        message: "Both Password Password doesn't match!",
      });
    }
    const userExist = await User.findOne({ id: id });
    if (!userExist) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    if (await bcrypt.compare(newPassword, userExist.dataValues.password)) {
      return res.status(400).json({
        success: false,
        message: "New should be different from previous password!",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      { password: hashedPassword },
      { where: { id: id } }
    );
    res.status(200).json({ success: true, message: "Password Reseted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword, repeatPassword } = req.body;
    if (!email || !newPassword || !repeatPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory!" });
    }
    const validUser = await User.findOne({ where: { email: email } });
    if (!validUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User!" });
    }
    if (newPassword !== repeatPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Both password doesn't match" });
    }

    if (await bcrypt.compare(newPassword, validUser.dataValues.password)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "New should be different from previous password!",
        });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      { password: hashedPassword },
      { where: { email: email } }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { signup, login, resetPassword, forgetPassword };
