const mongoose = require("mongoose");

const engagementLogSchema = new mongoose.Schema({
  instagramAccounts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstagramAccount",
  },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  postId: String,
  triggeredBy: String, // username or comment ID
  triggerType: { type: String, enum: ["COMMENT", "DM"], required: true },
  responseSent: Boolean,
  responseContent: String,
  status: { type: String, enum: ["SUCCESS", "FAILED"], default: "SUCCESS" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EngagementLog", engagementLogSchema);
