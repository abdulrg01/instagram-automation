const {
  createCampaignService,
  getCampaignsByInstagramAccountService,
  updateCampaignService,
  deleteCampaignService,
} = require("../service/campaign.service");
const { getUserInfoService } = require("../service/user.service");

const createCampaign = async (req, res) => {
  const userId = req.user;
  try {
    const user = await getUserInfoService(userId);
    const campaign = await createCampaignService(req.body);

    user.campaign.push(rule._id);
    await user.save();
    
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Other handlers similar to AutomationRule
const getCampaignsByInstagramAccount = async (req, res) => {
  try {
    const campaigns = await getCampaignsByInstagramAccountService(
      req.params.instagramAccountId
    );
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  getCampaignsByInstagramAccount,
  updateCampaign,
  deleteCampaign,
};
