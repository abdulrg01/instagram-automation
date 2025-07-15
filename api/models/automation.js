const mongoose = require("mongoose");

const Dms = new mongoose.Schema({
  senderId: {
    type: String,
  },
  receiver: {
    type: String,
  },
  message: {
    type: String,
  },
  type: {
    type: String,
    enum: ["MESSAGE", "SMARTAI"],
    default: "MESSAGE",
  },
  prompt: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = new mongoose.Schema({
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

const automation = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  name: { type: String, required: true },
  responseType: {
    type: String,
    enum: ["COMMENT", "DM"],
    default: "COMMENT",
  },
  trigger: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive", "completed"],
    default: "active",
  },
  responses: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  dmCounts: {
    type: Number,
    default: 0,
  },
  successRate: {
    type: Number,
    default: 0,
  },
  lastTriggered: { type: Date, default: null },
  desc: { type: String, default: "" },
  keywords: [
    {
      type: String,
      required: true,
    },
  ],
  responseTemplate: {
    type: String,
    required: true,
  },
  avgResponseTime: { type: Number, default: 0 },
  totalTrigger: { type: Number, default: null },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  instagramAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InstagramAccount",
  },
  listener: {
    type: String,
    enum: ["SMARTAI", "MESSAGE"],
    default: "MESSAGE",
  },
  posts: [Post],
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  dms: [Dms],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Automation || mongoose.model("Automation", automation);
