const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJwt");

const automation = require("../controllers/automation.controller");

router.post("/", verifyJWT, automation.createRule);

router.get("/get-user-roles/:userId", verifyJWT, automation.getUserRules);
router.get("/:ruleId", verifyJWT, automation.getARule);

router.put("/:id", verifyJWT, automation.updateRule);

router.put("/update-status", verifyJWT, automation.toggleStatus);

router.get("/:automationId/recent-activities", verifyJWT, automation.getRecentActivities);

router.post("/:id/add-listener", verifyJWT, automation.addListener);
router.patch("/:id/update-listener", verifyJWT, automation.updateListener);
router.patch("/:id/add-trigger", verifyJWT, automation.addTrigger);
router.patch("/:id/add-keyword", verifyJWT, automation.addKeyword);
router.delete("/:id", verifyJWT, automation.deleteRule);

module.exports = router;
