const express = require("express");
const verifyJWT = require("../middleware/verifyJwt");
const {
  getEngagementLogs,
  getPerformanceSummary,
  getEngagementSummaries,
  getMonthlyEngagement,
  getHomepageStats
} = require("../controllers/engagementLog.controller");

const router = express.Router();
router.get("/", verifyJWT, getEngagementLogs);
router.get("/performance-summary", verifyJWT, getPerformanceSummary);
router.get("/summaries", verifyJWT, getEngagementSummaries);
router.get("/monthly-engagement", verifyJWT, getMonthlyEngagement);
router.get("/home-stats", verifyJWT, getHomepageStats);

module.exports = router;
