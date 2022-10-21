const {
    signUpServices,
    verifyEmailServices,
    findUserByEmail,
  } = require("../services/user.services");
//   const sendEmail = require("../utils/email");
  const generateToken = require("../utils/token");
  
  const signupUser = async (req, res, next) => {
    try {
      const user = await signUpServices(req.body);
  
      const token = user.generateConfirmationToken();
  
      const emailButtonLink = `${req.protocol}://${req.get("host")}${
        req.originalUrl
      }/confirmation/${token}`;
  
    //   const emailBody = `
    //   <h3>Hello ${user?.name}</h3>
    //   <p>Please Verify Your Account</p>
    //   <a href=${emailButtonLink}>Click Here</a>
    //   `;
      // http://localhost:7000/user/signup/confirmation/c33af0cdb91ae29cbc7f6568ca6690e12857ff03104acf8d5b272ba2b836df95
      console.log(emailButtonLink);
      // const email = await sendEmail(user?.email, "verification email", emailBody);
  
      await user.save({ validateBeforeSave: false });
  
      if (!user) {
        return res.status(500).json({
          status: "fail",
          message: "Couldn't create User",
          error: error.message,
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Successfully signed up",
        user,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't create User",
        error: error.message,
      });
    }
  };
  
  const verifyUser = async (req, res) => {
    try {
      const { token } = req.params;
      const user = await verifyEmailServices(token);
  
      if (!user) {
        return res.status(403).json({
          status: "fail",
          error: "Invalid token",
        });
      }
  
      const expired = new Date() > new Date(user.confirmationTokenExpires);
  
      if (expired) {
        return res.status(401).json({
          status: "fail",
          error: "Token expired",
        });
      }
  
      user.status = "active";
      user.confirmationToken = undefined;
      user.confirmationTokenExpires = undefined;
  
      user.save({ validateBeforeSave: false });
  
      res.status(200).json({
        status: "success",
        message: "Successfully activated your account.",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't Actived Your Account",
        error: error.message,
      });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(401).json({
          status: "fail",
          error: "Please provide your credentials",
        });
      }
  
      const user = await findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({
          status: "fail",
          error: "No user found. Please create an account",
        });
      }
  
      const isPasswordValid = user.comparePassword(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(403).json({
          status: "fail",
          error: "Password is not correct",
        });
      }
  
      if (user.status != "active") {
        return res.status(401).json({
          status: "fail",
          error: "Your account is not active yet.",
        });
      }
  
      const token = generateToken(user);
  
      const { password: pass, ...others } = user.toObject();
  
      res.status(200).json({
        status: "success",
        message: "Successfully signed In",
        data: {
          token,
          user: others,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get User",
        error: error.message,
      });
    }
  };
  
  const getMe = async (req, res, next) => {
    try {
      const { email } = req.user || {};
      const user = await findUserByEmail(email);
      const { password: pass, ...others } = user.toObject();
  
      res.status(200).json({
        status: "success",
        user: others,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Couldn't get User",
        error: error.message,
      });
    }
  };
  
  module.exports = { signupUser, verifyUser, loginUser, getMe };