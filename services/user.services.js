const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUpServices = async (data) => {
  //   const password = this.password;

  //   const hashedPassword = bcrypt.hashSync(password);

  //   this.password = hashedPassword;
  //   this.confirmPassword = undefined;
  if (data.password !== data.confirmPassword) {
    return "confirmPassword Passwords don't match!";
  }
  const password = data.password;
  const hashedPassword = bcrypt.hashSync(password);
  data.password = hashedPassword;
  const user = await User.create(data);
  return user;
};

const verifyEmailServices = async (token) => {
  return await User.findOne({ confirmationToken: token });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { signUpServices, verifyEmailServices, findUserByEmail };