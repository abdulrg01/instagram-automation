const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET);

module.exports = stripe;
