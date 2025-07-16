const Application = require("../models/app.model.js");

const createAppService = async (data) => {
  const app = new Application(data);
  return await app.save();
};

const getAppService = async (appId) => {
  return await Application.findById(appId);
};

const getAppsService = async (user) => {
  return await Application.find({ user });
};

const updateAppService = async (id, data) => {
  return await Application.findByIdAndUpdate(id, data, { new: true });
};

const deleteAppService = async (id) => {
  return await Application.findByIdAndDelete(id);
};

module.exports = {
  createAppService,
  getAppService,
  updateAppService,
  getAppsService,
  deleteAppService,
};
