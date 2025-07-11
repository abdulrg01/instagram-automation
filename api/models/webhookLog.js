const mongoose = require("mongoose");

const webhookLogSchema = new mongoose.Schema({
  event: String,
  payload: mongoose.Schema.Types.Mixed,
  status: { type: String, enum: ["success", "failure"], default: "success" },
  error: String,
  retryCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WebhookLog", webhookLogSchema);
