const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sub = mongoose.Schema({
  plan: {
    type: String,
    enum: ["PRO", "FREE"],
    default: "FREE",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customerId: {
    type: String,
  },
});

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscription: sub,
  automation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Automation",
    },
  ],
  instagramAccounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstagramAccount",
    },
  ],
  campaign: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
  ],
  engagementLogSchema: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EngagementLog",
    },
  ],
});

user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

user.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", user);
