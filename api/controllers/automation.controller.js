const Automation = require("../models/Automation");
const {
  addListenerToAutomation,
  keywordsService,
  createTriggerForAutomation,
  createRuleService,
  getUserRulesService,
  updateRuleService,
  deleteRuleService,
  getARuleService,
  toggleStatusService,
} = require("../service/automationRule.service");
const { getUserInfoService } = require("../service/user.service");

const createRule = async (req, res) => {
  try {
    const user = await getUserInfoService(req.user);
    const rule = await createRuleService(req.user, req.body);
    user.automation.push(rule._id);
    await user.save();

    res.json(rule);
  } catch (error) {
    console.log("create new automation rule error", error);
  }
};

const getUserRules = async (req, res) => {
  try {
    const rules = await getUserRulesService(req.params.userId || req.user);
    res.status(200).json(rules);
  } catch (error) {
    console.error("Error fetching rules by user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getARule = async (req, res) => {
  try {
    const rule = await getARuleService(req.params.ruleId || req.params.id);
    res.status(200).json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRule = async (req, res) => {
  try {
    const updatedRule = await updateRuleService(req.params.id, req.body);
    res.status(200).json(updatedRule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const statusToggled = await toggleStatusService(req.body);
    res.status(200).json(statusToggled);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecentActivities = async (req, res) => {
  const { automationId } = req.params;
  const automation = await Automation.findById(automationId).select(
    "recentActivities"
  );

  if (!automation)
    return res.status(404).json({ message: "Automation not found" });
  res.json(automation.recentActivities);
};

const deleteRule = async (req, res) => {
  try {
    await deleteRuleService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addListener = async (req, res) => {
  const { prompt, commentReply } = req.body;
  const automationId = req.params.id;
  if (!prompt || !automationId) {
    return res
      .status(400)
      .json({ message: "Prompt and automation ID are required." });
  }

  try {
    const updated = await addListenerToAutomation(automationId, {
      prompt,
      commentReply,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateListener = async (req, res) => {
  const { type } = req.body;
  const automationId = req.params.id;

  try {
    const updated = await trackResponseService(automationId, type);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTrigger = async (req, res) => {
  const { trigger } = req.body;
  const automationId = req.params.id;
  if (!trigger || !automationId) {
    return res
      .status(400)
      .json({ message: "Triggers and automation ID are required." });
  }

  try {
    const updatedTrigger = await createTriggerForAutomation(
      automationId,
      trigger
    );
    res.status(200).json(updatedTrigger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addKeyword = async (req, res) => {
  const { word } = req.body;
  const automationId = req.params.id;
  if (!word || !automationId) {
    return res
      .status(400)
      .json({ message: "word and automation ID are required." });
  }

  try {
    const updatedKeyword = await keywordsService(automationId, word);
    res.status(200).json(updatedKeyword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRule,
  getARule,
  getUserRules,
  updateRule,
  toggleStatus,
  getRecentActivities,
  addListener,
  updateListener,
  addTrigger,
  addKeyword,
  deleteRule,
};
