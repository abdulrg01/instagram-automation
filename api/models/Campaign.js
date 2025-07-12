const mongoose = require("mongoose");

const postsMedia = new mongoose.Schema({
  id: {
    type: String,
  },
  postId: {
    type: String,
  },
  caption: {
    type: String,
  },
  media: {
    type: String,
  },
  mediaType: {
    type: String,
    enum: ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"],
  },
});

const campaignSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  instagramAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstagramAccount",
  },
  name: String,
  description: String,
  posts: [{ type: String }], // Post IDs (IG media IDs)
  postsData: [postsMedia],
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
