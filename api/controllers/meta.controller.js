const Automation = require("../models/Automation.js");
const Campaign = require("../models/Campaign.js");
const InstagramAccount = require("../models/InstagramAccount.js");
const {
  getInstagramAccountsService,
  updateInstagramAccountService,
  deleteInstagramAccountService,
  fetchWithAutoRefresh,
} = require("../service/instagramAccount.service");
const { getInstagramPosts } = require("../service/meta.service.js");

const getInstagramAccounts = async (req, res) => {
  try {
    const instagramAccounts = await getInstagramAccountsService(
      req.params.userId
    );
    res.status(200).json(instagramAccounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateInstagramAccount = async (req, res) => {
  try {
    const updatedInstagramAccount = await updateInstagramAccountService(
      req.params.id,
      req.body
    );
    if (!updatedInstagramAccount) {
      return res.status(404).json({ error: "Instagram account not found" });
    }
    res.status(200).json(updatedInstagramAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const exchangeTokenAndConnect = async (req, res) => {
  const userId = req.user;
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const appId = process.env.FB_APP_ID;
    const appSecret = process.env.FB_APP_SECRET;
    const redirectUri = process.env.FB_REDIRECT_URI;

    // 1. Exchange code for short-lived token
    const shortTokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`
    );
    const shortToken = await shortTokenRes.json();

    // 2. Exchange for long-lived token
    const longTokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortToken.access_token}`
    );
    const longToken = await longTokenRes.json();
    const accessToken = longToken.access_token;

    // 3. Get user's Pages
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    );
    const pagesData = await pagesRes.json();
    const page = pagesData.data?.[0];

    if (!page)
      return res.status(400).json({ error: "No connected Pages found" });

    // 4. Get IG Business ID
    const igRes = await fetch(
      `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${accessToken}`
    );
    const igData = await igRes.json();
    const igId = igData.instagram_business_account?.id;

    if (!igId)
      return res
        .status(400)
        .json({ error: "No IG business account linked to page" });

    // 5. Get IG details
    const igProfileRes = await fetch(
      `https://graph.facebook.com/v19.0/${igId}?fields=username,profile_picture_url&access_token=${accessToken}`
    );
    const igProfile = await igProfileRes.json();

    // 6. Save to DB
    const saved = await InstagramAccount.create({
      user: userId,
      igBusinessId: igId,
      pageId: page.id,
      accessToken,
      username: igProfile.username,
      profilePic: igProfile.profile_picture_url,
      tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getInstagramProfile = async (req, res) => {
  try {
    const { instagramAccountId } = req.params;

    const data = await fetchWithAutoRefresh(instagramAccountId, (token) =>
      fetch(
        `https://graph.facebook.com/v19.0/${instagramAccountId}?fields=username,profile_picture_url&access_token=${token}`
      )
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInstagramPostsHandler = async (req, res) => {
  try {
    const igAccount = await InstagramAccount.findById(req.params.id);
    if (!igAccount)
      return res
        .status(404)
        .json({ message: "Instagram account not connected" });

    const posts = await getInstagramPosts(
      igAccount.igBusinessId,
      igAccount.accessToken
    );
    res.json(posts);
  } catch (err) {
    console.error("Error fetching IG posts:", err);
    res.status(500).json({ message: "Failed to fetch Instagram posts" });
  }
};

const saveSelectedPostsHandler = async (req, res) => {
  try {
    const userId = req.user;
    const { automationId, posts } = req.body;

    const automation = await Automation.findOne({
      _id: automationId,
      user: userId,
    });
    if (!automation)
      return res.status(404).json({ message: "Automation rule not found" });

    const campaigns = await Campaign.find({
      user: userId,
      assignedRules: automationId,
    });

    // Avoid duplicates
    const newPosts = posts.filter(
      (post) => !automation.posts.some((p) => p.postId === post.postId)
    );

    automation.posts.push(...newPosts);
    await automation.save();

    campaigns.postsData.push(...newPosts);
    await campaigns.save();

    res
      .status(200)
      .json({ message: "Posts saved to automation", posts: automation.posts });
  } catch (err) {
    console.error("Error saving posts:", err);
    res.status(500).json({ message: "Failed to save selected posts" });
  }
};

const deleteInstagramAccount = async (req, res) => {
  try {
    const deletedInstagramAccount = await deleteInstagramAccountService(
      req.params.id
    );
    if (!deletedInstagramAccount) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const generateTokens = async (code) => {
//   const insta_form = new FormData();
//   insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID);

//   insta_form.append("client_secret", process.env.INSTAGRAM_CLIENT_SECRET);
//   insta_form.append("grant_type", "authorization_code");
//   insta_form.append(
//     "redirect_uri",
//     `${process.env.HOST_URL}/callback/instagram`
//   );
//   insta_form.append("code", code);

//   const shortTokenResponse = await fetch(process.env.INSTAGRAM_TOKEN_URL, {
//     method: "POST",
//     body: insta_form,
//   });

//   const token = await shortTokenResponse.json();
//   if (token.permissions.length > 0) {
//     log("Token permissions:", token.permissions);
//     const longTokenResponse = await fetch(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`,
//       {
//         method: "GET",
//       }
//     );
//     return await longTokenResponse.json();
//   }
// };

module.exports = {
  getInstagramAccounts,
  updateInstagramAccount,
  exchangeTokenAndConnect,
  getInstagramProfile,
  getInstagramPostsHandler,
  saveSelectedPostsHandler,
  deleteInstagramAccount,
};
