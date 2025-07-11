const { sendDM, respondToComment } = require("../service/automationRule.service.js");

const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.INSTAGRAM_VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.status(403).send("Verification failed");
};

const handleInstagramWebhook = async (req, res) => {
  try {
    const { entry } = req.body;
    console.log("Received Instagram webhook entry:", entry);
    
    if (!entry || !Array.isArray(entry)) {
      return res.status(400).send("Invalid webhook entry");
    }

    for (const change of entry) {
      const { messaging, changes } = change;

      // DM Trigger
      if (messaging) {
        for (const messageEvent of messaging) {
          const senderId = messageEvent.sender.id;
          const text = messageEvent.message?.text;

          await sendDM(senderId, text);
        }
      }

      // Comment Trigger
      if (changes) {
        for (const change of changes) {
          if (change.field === "comments") {
            const comment = change.value;
            await respondToComment(comment);
          }
        }
      }
    }

    res.status(200).send("EVENT_RECEIVED");
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(200).send("Error processing webhook");
  }
};

module.exports = { verifyWebhook, handleInstagramWebhook };
