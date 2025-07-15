const express = require("express");
const verifyJWT = require("../middleware/verifyJwt");
const Campaign = require("../controllers/campaign.controller");

const router = express.Router();

router.post("/", verifyJWT, Campaign.createCampaign);
router.get("/", verifyJWT, Campaign.getAllCampaigns);
router.get("/:campaignId/performance", verifyJWT, Campaign.getCampaignPerformance);
router.get("/:id", verifyJWT, Campaign.getCampaignById);
router.get("/summary/all", verifyJWT, Campaign.getCampaignSummaries);
router.put("/:id", verifyJWT, Campaign.updateCampaign);
router.delete("/:id", verifyJWT, Campaign.deleteCampaign);

module.exports = router;
