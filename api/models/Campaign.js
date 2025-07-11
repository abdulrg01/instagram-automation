const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  instagramAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstagramAccount",
  },
  name: String,
  description: String,
  postIds: [String], // IG media IDs
  assignedRules: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AutomationRule" },
  ],
  status: {
    type: String,
    enum: ["draft", "active", "completed", "archived"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Campaign", campaignSchema);
