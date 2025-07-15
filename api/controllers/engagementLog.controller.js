const EngagementLog = require("../models/engagementLog.js");
const InstagramAccount = require("../models/InstagramAccount.js");
const Automation = require("../models/automation.js");
const { startOfMonth, subMonths, endOfMonth, format } = require("date-fns");

const getEngagementLogs = async (req, res) => {
  try {
    const userId = req.user;

    const account = await InstagramAccount.findOne({ userId });
    if (!account)
      return res.status(404).json({ message: "Instagram account not found" });

    const logs = await EngagementLog.find({ instagramAccounts: account._id })
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(logs);
  } catch (error) {
    console.error("Failed to fetch engagement logs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPerformanceSummary = async (req, res) => {
  try {
    const userId = req.user;

    const account = await InstagramAccount.findOne({ userId });
    if (!account)
      return res.status(404).json({ message: "IG account not found" });

    const logs = await EngagementLog.find({
      instagramAccounts: account._id,
      timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // last 7 days
    });

    const summary = {
      Mon: { triggers: 0, responses: 0 },
      Tue: { triggers: 0, responses: 0 },
      Wed: { triggers: 0, responses: 0 },
      Thu: { triggers: 0, responses: 0 },
      Fri: { triggers: 0, responses: 0 },
      Sat: { triggers: 0, responses: 0 },
      Sun: { triggers: 0, responses: 0 },
    };

    logs.forEach((log) => {
      const day = new Date(log.timestamp).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!summary[day]) return;

      summary[day].triggers += 1;
      if (log.responseSent) summary[day].responses += 1;
    });

    // Add successRate field
    const result = Object.entries(summary).map(([day, stats]) => ({
      day,
      ...stats,
      successRate:
        stats.triggers === 0
          ? 0
          : Math.round((stats.responses / stats.triggers) * 100),
    }));

    res.json(result);
  } catch (error) {
    console.error("Error getting performance summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEngagementSummaries = async (req, res) => {
  try {
    const userId = req.user;
    const account = await InstagramAccount.findOne({ userId });
    if (!account) return res.status(404).json({ message: "No IG account" });

    const logs = await EngagementLog.find({ instagramAccounts: account._id })
      .sort({ timestamp: -1 })
      .limit(10);

    const summaries = await Promise.all(
      logs.map(async (log) => {
        let message = "";

        if (log.triggerType === "COMMENT") {
          const automation = await Automation.findOne({
            instagramAccountId: account._id,
            "posts.postId": log.postId,
          });

          const matchedPost = automation?.posts?.find(
            (p) => p.postId === log.postId
          );
          const caption = matchedPost?.caption || "an Instagram post";
          message = `Auto-replied to comment on "${caption}" post`;
        } else if (log.triggerType === "DM") {
          message = `Sent welcome DM to new follower @${log.triggeredBy}`;
        } else {
          message = `Automated response to @${log.triggeredBy}`;
        }

        return {
          message,
          timestamp: log.timestamp,
          responseSent: log.responseSent,
        };
      })
    );

    res.json(summaries);
  } catch (err) {
    console.error("Error building summaries:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getMonthlyEngagement = async (req, res) => {
  try {
    const userId = req.user;
    const account = await InstagramAccount.findOne({ user: userId });

    if (!account)
      return res.status(404).json({ message: "No IG account found" });

    // Past 6 months
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 5);
    fromDate.setDate(1);
    fromDate.setHours(0, 0, 0, 0);

    const logs = await EngagementLog.find({
      instagramAccounts: account._id,
      timestamp: { $gte: fromDate },
    });

    const summary = {};

    logs.forEach((log) => {
      const monthKey = format(new Date(log.timestamp), "MMM"); // e.g., "Jun"

      if (!summary[monthKey]) {
        summary[monthKey] = {
          respondToComment: 0,
          dms: 0,
        };
      }

      if (log.triggerType === "COMMENT") {
        summary[monthKey].respondToComment += 1;
      } else if (log.triggerType === "DM") {
        summary[monthKey].dms += 1;
      }
    });

    // Build full array with correct month order
    const now = new Date();
    const response = [];
    for (let i = 5; i >= 0; i--) {
      const month = format(
        new Date(now.getFullYear(), now.getMonth() - i, 1),
        "MMM"
      );
      const stats = summary[month] || { respondToComment: 0, dms: 0 };
      response.push({
        month,
        ...stats,
        engagement: stats.respondToComment + stats.dms,
      });
    }

    res.json(response);
  } catch (err) {
    console.error("Monthly engagement error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getHomepageStats = async (req, res) => {
  try {
    const userId = req.user;
    const account = await InstagramAccount.findOne({ userId });

    if (!account)
      return res.status(404).json({ message: "No Instagram account found" });

    const now = new Date();
    const startCurrentMonth = startOfMonth(now);
    const startLastMonth = startOfMonth(subMonths(now, 1));
    const endLastMonth = endOfMonth(subMonths(now, 1));

    const currentLogs = await EngagementLog.find({
      instagramAccounts: account._id,
      timestamp: { $gte: startCurrentMonth },
      responseSent: true,
    });

    const lastMonthLogs = await EngagementLog.find({
      instagramAccounts: account._id,
      timestamp: { $gte: startLastMonth, $lte: endLastMonth },
      responseSent: true,
    });

    const countStats = (logs) => {
      let autoReplies = 0;
      let dmsSent = 0;
      let comments = 0;

      logs.forEach((log) => {
        autoReplies += 1;
        if (log.triggerType === "DM") dmsSent += 1;
        if (log.triggerType === "COMMENT") comments += 1;
      });

      return { autoReplies, dmsSent, comments };
    };

    const current = countStats(currentLogs);
    const previous = countStats(lastMonthLogs);

    const calcChange = (curr, prev) =>
      prev === 0 ? null : +(((curr - prev) / prev) * 100).toFixed(1);

    res.json({
      autoReplies: {
        count: current.autoReplies,
        change: calcChange(current.autoReplies, previous.autoReplies),
      },
      dmsSent: {
        count: current.dmsSent,
        change: calcChange(current.dmsSent, previous.dmsSent),
      },
      comments: {
        count: current.comments,
        change: calcChange(current.comments, previous.comments),
      },
    });
  } catch (err) {
    console.error("Homepage stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getEngagementLogs,
  getPerformanceSummary,
  getEngagementSummaries,
  getMonthlyEngagement,
  getHomepageStats,
};
