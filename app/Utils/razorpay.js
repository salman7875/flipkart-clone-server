const crypto = require("crypto");

const hmac_sha256 = (data, key) => {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
};

module.exports = { hmac_sha256 };
