const InstagramAccount = require("../models/InstagramAccount");

const getInstagramAccountsService = async (userId) => {
  return await InstagramAccount.find({ userId });
};

const updateInstagramAccountService = async (id, data) => {
  return await InstagramAccount.findByIdAndUpdate(id, data, { new: true });
};

const refreshInstagramToken = async (instagramAccountId) => {
  const account = await InstagramAccount.findById(instagramAccountId);
  if (!account) throw new Error("Instagram account not found");

  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  const res = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${account.accessToken}`
  );

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  account.accessToken = data.access_token;
  account.tokenExpiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  account.lastSync = new Date();
  account.status = "connected";
  await account.save();

  return account;
};

const fetchWithAutoRefresh = async (instagramAccountId, makeRequest) => {
  const account = await InstagramAccount.findById(instagramAccountId);
  if (!account) throw new Error("Instagram account not found");

  let token = account.accessToken;

  // 1st attempt
  let res = await makeRequest(token);
  let json = await res.json();

  // Check for token failure
  if (json.error?.type === "OAuthException") {
    console.warn("Access token expired, attempting to refresh...");

    // Refresh token
    const updatedAccount = await refreshInstagramToken(instagramAccountId);
    token = updatedAccount.accessToken;

    // Retry original request
    res = await makeRequest(token);
    json = await res.json();
  }

  if (!res.ok) {
    throw new Error(json.error?.message || "Instagram API call failed");
  }

  return json;
};

const deleteInstagramAccountService = async (id) => {
  return await Campaign.findByIdAndDelete(id);
};

module.exports = {
  getInstagramAccountsService,
  updateInstagramAccountService,
  refreshInstagramToken,
  fetchWithAutoRefresh,
  deleteInstagramAccountService,
};
