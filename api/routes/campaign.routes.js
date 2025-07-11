const express = require("express");
const verifyJWT = require("../middleware/verifyJwt");
const Campaign = require("../controllers/campaign.controller");

const router = express.Router();

router.post("/", verifyJWT, Campaign.createCampaign);
router.get(
  "/:instagramAccountId",
  verifyJWT,
  Campaign.getCampaignsByInstagramAccount
);
router.put("/:id", verifyJWT, Campaign.updateCampaign);
router.delete("/:id", verifyJWT, Campaign.deleteCampaign);

module.exports = router;
