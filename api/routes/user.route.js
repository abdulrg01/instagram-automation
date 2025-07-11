const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJwt");
const users = require("../controllers/user.controller");
const payment = require("../controllers/payment.controller");

router.route("/:id").get(verifyJWT, users.getUserInfo);
router.route("/register").post(users.createNewUser);
router.route("/login").post(loginLimiter, users.loginUser);
router.route("/refresh").get(users.refresh);
router.route("/logout").post(verifyJWT, users.logout);
router.post("/stripe-verification", verifyJWT, payment.stripeVerification);
router.get("/create-stripe-session", verifyJWT, payment.createStripeSession);

module.exports = router;
