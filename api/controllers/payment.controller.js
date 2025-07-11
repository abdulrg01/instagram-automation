const stripe = require("../service/stripe.service");
const {
  createStripeSessionService,
  updateSubscription,
} = require("../utils/payment");

const createStripeSession = async (req, res) => {
  try {
    const session = await createStripeSessionService();
    console.log("stripe session created:", session.session_url);
    res.json({ session_url: session.session_url });
  } catch (error) {
    console.error("stripe session creation error:", error);
    res.status(500).json({
      message: "Error creating payment session",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
    return;
  }
};

const stripeVerification = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    res.status(401).json({ message: "No user found" });
    return;
  }

  const { session_id } = req.body;
  if (!session_id) {
    res.status(400).json({ message: "Session ID is required" });
    return;
  }
  console.log("Verifying session:", session_id);

  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session) {
    const customerId = session.customer;
    await updateSubscription(customerId, "PRO", userId);
    console.log("Session status:", session);
    res.status(200).json({ success: true });
  }

  res.status(500).json({ success: false });
};

module.exports = { createStripeSession, stripeVerification };
