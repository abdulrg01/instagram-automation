const Campaign = require("../models/Campaign.js");

const createCampaignService = async (data) => {
  return await new Campaign(data).save();
};

const getCampaignsByInstagramAccountService = async (instagramAccountId) => {
  return await Campaign.find({ instagramAccountId })
};

const updateCampaignService = async (id, data) => {
  return await Campaign.findByIdAndUpdate(id, data, { new: true });
};

const deleteCampaignService = async (id) => {
  return await Campaign.findByIdAndDelete(id);
};

module.exports = {
  createCampaignService,
  getCampaignsByInstagramAccountService,
  updateCampaignService,
  deleteCampaignService,
};
