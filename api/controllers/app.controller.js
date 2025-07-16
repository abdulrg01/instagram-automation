const appService = require("../service/app.service");

const createApp = async (req, res) => {
  try {
    const app = await appService.createAppService(req.body);
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppById = async (req, res) => {
  try {
    const app = await appService.getAppService(req.params.appId);
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApps = async (req, res) => {
  try {
    const app = await appService.getAppsService(req.user);
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateApp = async (req, res) => {
  try {
    const updatedApp = await appService.updateAppService(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteApp = async (req, res) => {
  try {
    await appService.deleteAppService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createApp, getAppById, getApps, updateApp, deleteApp };
