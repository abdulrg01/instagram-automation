const Automation = require("../models/Automation.js");
const Engagement = require("../models/engagementLog.js");
const withRetry = require("../utils/retry.js");
const {
  sendInstagramCommentReply,
  sendInstagramDM,
} = require("./meta.service.js");
const openai = require("../service/openai.service");

// Handle COMMENT automation
const respondToComment = async (comment) => {
  const { text, post_id } = comment;
  const keywordText = text.toLowerCase();

  const automation = await Automation.findOne({
    status: "active",
    "posts.postId": post_id,
    keywords: { $in: [keywordText] },
    responseType: "COMMENT",
  }).populate({ path: "user", select: "subscription" });

  if (!automation) return;

  const listener = automation.listener || "MESSAGE";
  const userSubscription = automation.user.subscription.plan;

  let replyText = "";

  if (listener === "SMARTAI" && userSubscription === "PRO") {
    const smartReply = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "assistant",
          content: `${automation.responseTemplate}: keep response under 2 sentences`,
        },
      ],
    });

    replyText =
      smartReply.choices?.[0]?.message?.content || "Thanks for your comment!";
  } else {
    replyText = automation.responseTemplate.replace(
      "{user}",
      comment.username || "there"
    );
  }

  await withRetry(() =>
    sendInstagramCommentReply(post_id, comment.id, replyText)
  );

  automation.responses += 1;
  automation.comments += 1;
  automation.lastTriggered = new Date();
  automation.posts = automation.posts.map((post) => {
    if (post.postId === post_id) {
      post.comments.push({
        senderId: comment.senderId,
        message: text,
        prompt: replyText,
        type: listener,
      });
    }
    return post;
  });
  await Engagement.create({
    instagramAccounts: automation.instagramAccountId,
    postId: post_id,
    triggeredBy: comment.senderId,
    triggerType: "COMMENT",
    responseSent: true,
    responseContent: replyText,
    status: "SUCCESS",
  });
  automation.avgResponseTime =
    (automation.avgResponseTime * automation.responses +
      (new Date() - automation.lastTriggered)) /
    (automation.responses + 1);
  automation.totalTrigger += 1;
  automation.successRate =
    (automation.responses / automation.totalTrigger) * 100 || 0;
  automation.posts = automation.posts.map((post) => {
    if (post.postId === post_id) {
      post.lastTriggered = new Date();
    }
    return post;
  });
  await automation.save();
};

// Handle DM
const sendDM = async (senderId, text) => {
  const lowerText = text.toLowerCase();

  // Try to find matching automation rule
  const automation = await Automation.findOne({
    status: "active",
    responseType: "DM",
    keywords: { $in: [lowerText] },
  }).populate({ path: "user", select: "subscription" });

  // If keyword matched, proceed with automation
  if (automation) {
    const listenerType = automation.listener || "MESSAGE";
    const userPlan = automation.user.subscription?.plan || "FREE";
    let finalMessage = "";

    if (listenerType === "MESSAGE") {
      finalMessage = automation.responseTemplate.replace("{user}", "you");
    } else if (listenerType === "SMARTAI" && userPlan === "PRO") {
      const smart_ai_message = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "assistant",
            content: `${automation.responseTemplate}: keep response under 2 sentences`,
          },
        ],
      });

      finalMessage =
        smart_ai_message.choices?.[0]?.message?.content ||
        "Thanks for reaching out!";
    } else {
      finalMessage = "Upgrade to PRO for smart replies 😉";
    }

    await withRetry(() => sendInstagramDM(senderId, finalMessage));

    automation.responses += 1;
    automation.dmCounts += 1;
    automation.lastTriggered = new Date();
    automation.dms.push({
      senderId,
      receiver: "me",
      message: text,
      prompt: finalMessage,
      type: listenerType,
    });

    await Engagement.create({
      instagramAccounts: automation.instagramAccountId,
      postId: null,
      triggeredBy: senderId,
      triggerType: "DM",
      responseSent: true,
      status: "SUCCESS",
      responseContent: finalMessage,
    });

    automation.avgResponseTime =
      (automation.avgResponseTime * automation.responses +
        (new Date() - automation.lastTriggered)) /
      (automation.responses + 1);
    automation.totalTrigger += 1;
    automation.successRate =
      (automation.responses / automation.totalTrigger) * 100 || 0;
    automation.lastTriggered = new Date();

    await automation.save();
    return;
  }

  // 🔁 No automation matched — try SMARTAI fallback if user is PRO and has SMARTAI listener
  const smartAutomation = await Automation.findOne({
    status: "active",
    responseType: "DM",
    listener: "SMARTAI",
  }).populate({ path: "user", select: "subscription" });

  const userPlan = smartAutomation?.user.subscription?.plan || "FREE";
  const listenerType = smartAutomation?.listener || "MESSAGE";

  if (smartAutomation && listenerType === "SMARTAI" && userPlan === "PRO") {
    // 🧠 Build chat history from previous DMs (limit to last 5)
    const chatHistory = smartAutomation.dms
      .filter((dm) => dm.senderId === senderId)
      .slice(-5)
      .map((dm) => ({
        role: "user",
        content: dm.message,
      }));

    // Add current message as latest user input
    chatHistory.push({
      role: "user",
      content: text,
    });

    const smart_ai_message = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an assistant helping Instagram customers. Keep responses under 2 sentences.`,
        },
        ...chatHistory,
        {
          role: "user",
          content: text,
        },
      ],
    });

    const finalMessage =
      smart_ai_message.choices?.[0]?.message?.content ||
      "Hi there! How can I help?";

    await withRetry(() => sendInstagramDM(senderId, finalMessage));

    smartAutomation.responses += 1;
    smartAutomation.dmCounts += 1;
    smartAutomation.comments += 1;
    smartAutomation.lastTriggered = new Date();
    smartAutomation.dms.push({
      senderId,
      receiver: "me",
      message: text,
      prompt: finalMessage,
      type: "SMARTAI",
    });
    await Engagement.create({
      instagramAccounts: smartAutomation.instagramAccountId,
      postId: null,
      triggeredBy: senderId,
      triggerType: "DM",
      responseSent: true,
      status: "SUCCESS",
      responseContent: finalMessage,
    });
    smartAutomation.avgResponseTime =
      (smartAutomation.avgResponseTime * smartAutomation.responses +
        (new Date() - smartAutomation.lastTriggered)) /
      (smartAutomation.responses + 1);
    smartAutomation.totalTrigger += 1;
    smartAutomation.successRate =
      (smartAutomation.responses / smartAutomation.totalTrigger) * 100 || 0;
    smartAutomation.lastTriggered = new Date();
    await smartAutomation.save();
    return;
  }

  // ❌ No match + not PRO user
  await withRetry(() =>
    sendInstagramDM(
      senderId,
      "Hi! We're not sure how to respond to that yet 😅",
      process.env.DEFAULT_ACCESS_TOKEN
    )
  );
};

const createRuleService = async (user, info) => {
  if (!info.name || !info.trigger) {
    throw new Error("Name and trigger are required");
  }

  const existingAutomation = await Automation.findOne({
    user,
    name: info.name,
  });
  if (existingAutomation) {
    throw new Error("Automation with this name already exists");
  }
  const rule = new Automation({ ...info, user });
  return await rule.save();
};

const getUserRulesService = async (user) => {
  return await Automation.find({ user });
};

const getARuleService = async (id) => {
  return await Automation.findById(id);
};

const updateRuleService = async (id, data) => {
  return await Automation.findByIdAndUpdate(id, data, { new: true });
};

const toggleStatusService = async (data) => {
  const automation = await Automation.findById(data.id);
  if (!automation) return new Error("No automation found");

  automation.status = data.status;
  automation.save();

  return automation;
};

const getRuleService = async (id) => {
  const automation = await Automation.findById(id).exec();

  if (!automation) {
    throw new Error("No automation found");
  }

  return automation;
};

const addListenerToAutomation = async (automationId, listenerData) => {
  try {
    const updatedAutomation = await Automation.findByIdAndUpdate(
      automationId,
      {
        $push: {
          listener: listenerData,
        },
      },
      { new: true }
    );

    return updatedAutomation;
  } catch (err) {
    console.error("Error adding listener:", err);
    throw err;
  }
};

const createTriggerForAutomation = async (automationId, trigger) => {
  try {
    const updatedTrigger = await Automation.findByIdAndUpdate(
      automationId,
      {
        $push: {
          trigger: {
            type: trigger,
            automationId: automationId,
          },
        },
      },
      { new: true }
    ).lean();
    return updatedTrigger;
  } catch (error) {
    console.error("Error adding triggers:", error);
    return { success: false, error: "Failed to add triggers" };
  }
};

const keywordsService = async (automationId, keyword) => {
  try {
    const updatedKeyword = await Automation.findByIdAndUpdate(
      automationId,
      {
        $push: {
          keywords: {
            word: keyword,
            automationId: automationId,
          },
        },
      },
      { new: true }
    ).lean();
    return updatedKeyword;
  } catch (err) {
    console.error("Error saving trigger:", err.message);
    throw err;
  }
};

const deleteRuleService = async (id) => {
  return await Automation.findByIdAndDelete(id);
};

module.exports = {
  respondToComment,
  sendDM,
  createRuleService,
  updateRuleService,
  toggleStatusService,
  getRuleService,
  getARuleService,
  getUserRulesService,
  addListenerToAutomation,
  createTriggerForAutomation,
  keywordsService,
  deleteRuleService,
};
