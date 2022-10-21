const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const { email, role } = user;
  const payload = { email, role };
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "1days",
  });

  return token;
};

module.exports = generateToken;