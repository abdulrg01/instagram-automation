const express = require("express");
const {
  createApp,
  updateApp,
  deleteApp,
  getAppById,
  getApps,
} = require("../controllers/app.controller");

const router = express.Router();

router.post("/", createApp);
router.get("/", getApps);
router.get("/:appId", getAppById);
router.put("/:id", updateApp);
router.delete("/:id", deleteApp);

module.exports = router;
