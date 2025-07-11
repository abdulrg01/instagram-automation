const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const createNewUserService = async (userData) => {
  const { name, email, password } = userData;
  const user = await User.create({
    name,
    email,
    password,
  });
  if (!user) {
    throw new Error("User not created");
  }

  return user;
};

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const matchPwd = await user.matchPassword(password);
  if (!matchPwd) {
    throw new Error("Password not matched");
  }
  return user;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  createNewUserService,
  loginUserService,
};
