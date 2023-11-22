const jwt = require("jsonwebtoken");

const checkAuthToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    jwt.verify(token, process.env.JWT_SEC, (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
      req.user = data;
      console.log(data);
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing or invalid token" });
  }
};

module.exports = { checkAuthToken };
