const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  instagramAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstagramAccount",
  },
  name: String,
  description: String,
  posts: [{ type: String }], // Post IDs (IG media IDs)
  assignedRules: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AutomationRule" },
  ],
  status: {
    type: String,
    enum: ["draft", "active", "completed", "archived"],
    default: "active",
  },
  startDate: { type: Date, default: Date.now },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
