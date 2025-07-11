const User = require("../models/user");
const stripe = require("../service/stripe.service");

async function updateSubscription(customerId, plan, userId) {
  try {
    const updateUserSub = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          subscription: {
            customerId,
            plan,
          },
        },
      },
      { new: true }
    );
    return updateUserSub;
  } catch (error) {
    console.log("Transaction creation error:", error);
    throw error;
  }
}

async function createStripeSessionService() {
  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
  if (!priceId) {
    console.error("Missing STRIPE_SECRET_KEY");
  }

  try {
    if (!stripe) {
      throw new Error("Stripe is not configured");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment?cancel=true`,
    });

    return { session_url: session.url };
  } catch (error) {
    console.log("Error in Payment", error);
  }
}

module.exports = {
  updateSubscription,
  createStripeSessionService,
};
