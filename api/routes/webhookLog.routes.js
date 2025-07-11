const express = require("express");
const {
  verifyWebhook,
  handleInstagramWebhook,
} = require("../controllers/webhookLog.controller");

const router = express.Router();

router.get("/", verifyWebhook); // Meta verification
router.post("/", handleInstagramWebhook);

module.exports = router;
