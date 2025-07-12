const {
  createCampaignService,
  getCampaignsService,
  updateCampaignService,
  deleteCampaignService,
  getAllCampaignsService,
  getCampaignByIdService,
} = require("../service/campaign.service");
const { getUserInfoService } = require("../service/user.service");

const createCampaign = async (req, res) => {
  const userId = req.user;
  try {
    const user = await getUserInfoService(userId);
    const campaign = await createCampaignService(req.body, userId);

    user.campaign.push(campaign._id);
    await user.save();

    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await getCampaignsService(req.user);
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await getAllCampaignsService(req.user);
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("getAllCampaigns error:", err);
    res.status(500).json({ message: "Failed to fetch campaigns", error: err });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const campaign = await getCampaignByIdService(req.params.id);
    res.status(200).json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving campaign", error: err });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const updatedCampaign = await updateCampaignService(
      req.params.id,
      req.body
    );
    if (!updatedCampaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    res.status(200).json(updatedCampaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const deletedCampaign = await deleteCampaignService(req.params.id);
    if (!deletedCampaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  getAllCampaigns,
  updateCampaign,
  deleteCampaign,
};
