const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  appName: {
    type: String,
  },
  appId: {
    type: String,
  },
  appSecret: {
    type: String,
  },
  igVerifyToken: {
    type: String,
  },
  igAccessToken: {
    type: String,
  },
  igEmbeddedOauthUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Application", appSchema);
