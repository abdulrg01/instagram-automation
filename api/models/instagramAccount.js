const mongoose = require("mongoose");

const instagramAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  igBusinessId: { type: String, required: true },
  pageId: String,
  accessToken: { type: String, required: true },
  tokenExpiresAt: Date,
  username: String,
  followers: Number,
  status: {
    type: String,
    enum: ["connected", "disconnected", "error"],
    default: "connected",
  },
  profilePic: String,
  connectedAt: { type: Date, default: Date.now },
  instagramId: {
    type: String,
    // require: true,
  },
  lastSync: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InstagramAccount", instagramAccountSchema);
