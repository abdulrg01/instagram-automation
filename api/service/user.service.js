const User = require("../models/user");

const getUserInfoService = async (id) => {
  const user = await User.findById(id)
    .populate("automation")
    .populate("instagramAccounts")
    .populate("campaign")
    .select("-password");

  if (!user) {
    throw new Error("No User found");
  }

  return user;
};

const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  if (!users) {
    throw new Error("No Users found");
  }
  return users;
};

const updateUserService = async (id, userData) => {
  const { name, email, password } = userData;
  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password,
    },
    { new: true }
  );
  if (!user) {
    throw new Error("User not updated");
  }

  return user;
};

const deleteUserService = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not deleted");
  }

  return user;
};

module.exports = {
  getUserInfoService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
};
