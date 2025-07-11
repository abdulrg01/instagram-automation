const express = require("express");
const {
  exchangeTokenAndConnect,
  getInstagramAccounts,
  updateInstagramAccount,
  deleteInstagramAccount,
  getInstagramProfile,
  getInstagramPostsHandler,
  saveSelectedPostsHandler,
} = require("../controllers/meta.controller.js");
const verifyJWT = require("../middleware/verifyJwt.js");

const router = express.Router();

router.post("/exchange-token", verifyJWT, exchangeTokenAndConnect);
router.put("/refresh-token/:instagramAccountId", getInstagramProfile);

router.get("/user-ig-posts/:id", verifyJWT, getInstagramPostsHandler);
router.post("/save-post", verifyJWT, saveSelectedPostsHandler);

router.get("/:userId", verifyJWT, getInstagramAccounts);
router.put("/:id", verifyJWT, updateInstagramAccount);
router.delete("/:id", verifyJWT, deleteInstagramAccount);

module.exports = router;
