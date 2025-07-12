const Campaign = require("../models/Campaign.js");
const EngagementLog = require("../models/engagementLog.js");

const createCampaignService = async (data, userId) => {
  const { name, description, automationRules, posts, category } = data;
  return await Campaign.create({
    userId,
    name,
    description,
    automationRules,
    posts,
    category,
  });
};

const getCampaignsService = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return await Campaign.find({ userId });
};

const getAllCampaignsService = async (userId) => {
  try {
    const campaigns = await Campaign.find({ userId })
      .populate("automationRules")
      .lean();

    const campaignIds = campaigns.map((c) => c._id);
    const logs = await EngagementLog.find({
      campaignId: { $in: campaignIds },
    }).lean();

    const campaignPerformanceMap = {};

    for (const log of logs) {
      const id = log.campaignId?.toString();
      if (!campaignPerformanceMap[id]) {
        campaignPerformanceMap[id] = {
          impressions: 0,
          engagement: 0,
          conversions: 0,
        };
      }

      campaignPerformanceMap[id].impressions += 1;
      if (log.responseSent) campaignPerformanceMap[id].engagement += 1;
      if (log.triggerType === "DM") campaignPerformanceMap[id].conversions += 1;
    }

    const result = campaigns.map((campaign) => {
      const perf = campaignPerformanceMap[campaign._id.toString()] || {
        impressions: 0,
        engagement: 0,
        conversions: 0,
      };

      const roi =
        perf.impressions > 0
          ? Math.round((perf.conversions / perf.impressions) * 100)
          : 0;

      return {
        ...campaign,
        performance: {
          impressions: perf.impressions,
          engagement: perf.engagement,
          conversions: perf.conversions,
          roi,
        },
      };
    });

    return result;
  } catch (err) {
    console.error("getAllCampaigns error:", err);
    new Error({ message: "Failed to fetch campaigns", error: err });
  }
};

const getCampaignByIdService = async (campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId)
      .populate("automationRules")
      .lean();

    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    // Aggregate engagement logs for this campaign
    const logs = await EngagementLog.find({ campaignId });

    const impressions = logs.length;
    const engagement = logs.filter((log) => log.responseSent).length;
    const conversions = logs.filter((log) => log.triggerType === "DM").length;

    // Simulate ROI (e.g. conversions / impressions) — you can customize this
    const roi = impressions > 0 ? (conversions / impressions) * 100 : 0;

    return {
      ...campaign,
      performance: {
        impressions,
        engagement,
        conversions,
        roi: Math.round(roi),
      },
    };
  } catch (err) {
    new Error({ message: "Error retrieving campaign", error: err });
  }
};

const updateCampaignService = async (id, data) => {
  return await Campaign.findByIdAndUpdate(id, data, { new: true });
};

const deleteCampaignService = async (id) => {
  return await Campaign.findByIdAndDelete(id);
};

module.exports = {
  createCampaignService,
  getCampaignsService,
  getCampaignByIdService,
  getAllCampaignsService,
  updateCampaignService,
  deleteCampaignService,
};
