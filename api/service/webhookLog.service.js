// const openai = require("../service/openai.service");
// const axios = require("axios");

// const sendDM = async (userId, receiverId, prompt, token) => {
//   console.log("sending message");
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
//     {
//       recipient: {
//         id: receiverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

// const sendPrivateMessage = async (userId, receiverId, prompt, token) => {
//   console.log("sending message");
//   return await axios.post(
//     `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
//     {
//       recipient: {
//         comment_id: receiverId,
//       },
//       message: {
//         text: prompt,
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

// const instagramService = async (req, res) => {
//   const webhook_payload = req.body;
//   if (!webhook_payload || !webhook_payload.entry) {
//     return res.json(
//       { message: "No webhook payload or entry found" },
//       { status: 400 }
//     );
//   }

//   const userId = req.user;
//   if (!userId) {
//     return res.json(
//       { message: "User ID not found in request" },
//       { status: 400 }
//     );
//   }

//   let matcher;

//   try {
//     if (webhook_payload.entry[0].messaging) {
//       matcher = await matchKeyword(
//         userId,
//         webhook_payload.entry[0].messaging[0].message.text
//       );
//     }
//     if (webhook_payload.entry[0].changes) {
//       matcher = await matchKeyword(
//         userId,
//         webhook_payload.entry[0].changes[0].value.text
//       );
//     }
//     if (matcher && matcher.automationId) {
//       if (webhook_payload.entry[0].messaging) {
//         const automation = await getKeywordAutomationService(
//           matcher.automationId,
//           "DM"
//         );
//         if (automation && automation.trigger.length !== 0) {
//           if (automation.listener && automation.listener.type === "MESSAGE") {
//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               automation.listener?.prompt,
//               automation.user.integrations[0].token
//             );

//             if (direct_message.status === 200) {
//               const tracked = await trackResponseService(automation._id, "DM");
//               if (tracked) {
//                 return res.json({ message: "Message sent" }, { status: 200 });
//               }
//             }
//           }
//           if (
//             automation.listener &&
//             automation.listener.type === "SMARTAI" &&
//             automation.user.subscription.plan === "PRO"
//           ) {
//             const smart_ai_message = await openai.chat.application.create({
//               model: "gpt-4o",
//               message: [
//                 {
//                   role: "assistant",
//                   content: `${automation.listener.prompt}: keep response under 2 sentences`,
//                 },
//               ],
//             });

//             if (smart_ai_message.choices[0].message.content) {
//               const receiver = await createChatHistoryService(
//                 automation._id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 webhook_payload.entry[0].messaging[0].message.text
//               );

//               // await client.$transaction([receiver, sender])

//               const sender = await createChatHistoryService(
//                 automation._id,
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content
//               );

//               const direct_message = await sendDM(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].messaging[0].sender.id,
//                 smart_ai_message.choices[0].message.content,
//                 automation.user.integrations[0].token
//               );

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponseService(
//                   automation._id,
//                   "DM"
//                 );
//                 if (tracked) {
//                   return res.json({ message: "Message sent" }, { status: 200 });
//                 }
//               }
//             }
//           }
//         }
//       }

//       if (
//         webhook_payload.entry[0].changes &&
//         webhook_payload.entry[0].changes.field === "comments"
//       ) {
//         const automation = await getKeywordAutomationService(
//           matcher.automationId,
//           "COMMENT"
//         );

//         console.log("getting the automation");
//         const automation_posts = await getKeywordPostService(
//           webhook_payload.entry[0].changes[0].value.media.id,
//           automation?._id
//         );

//         console.log("found keyword", automation_posts);
//         if (automation && automation_posts && automation.trigger) {
//           if (automation.listener) {
//             if (automation.listener.type === "MESSAGE") {
//               const direct_message = await sendPrivateMessage(
//                 webhook_payload.entry[0].id,
//                 webhook_payload.entry[0].changes[0].value.id,
//                 automation.listener?.prompt,
//                 automation.user.integrations[0].token
//               );

//               if (direct_message.status === 200) {
//                 const tracked = await trackResponseService(
//                   automation._id,
//                   "COMMENT"
//                 );
//                 if (tracked) {
//                   return res.json({ message: "Message sent" }, { status: 200 });
//                 }
//               }
//             }
//             if (
//               automation.listener.type === "SMARTAI" &&
//               automation.user.subscription.plan === "PRO"
//             ) {
//               const smart_ai_message = await openai.chat.completions.create({
//                 model: "gpt-4o",
//                 message: [
//                   {
//                     role: "assistant",
//                     content: `${automation.listener.prompt}: keep response under 2 sentences`,
//                   },
//                 ],
//               });

//               if (smart_ai_message.choices[0].message.content) {
//                 const receiver = await createChatHistoryService(
//                   automation._id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   webhook_payload.entry[0].changes[0].value.text
//                 );

//                 const sender = await createChatHistoryService(
//                   automation._id,
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.from.id,
//                   smart_ai_message.choices[0].message.content
//                 );

//                 // await client.$transaction([receiver, sender])

//                 const direct_message = await sendPrivateMessage(
//                   webhook_payload.entry[0].id,
//                   webhook_payload.entry[0].changes[0].value.id,
//                   automation.listener?.prompt,
//                   automation.user.integrations[0].token
//                 );

//                 if (direct_message.status === 200) {
//                   const tracked = await trackResponseService(
//                     automation._id,
//                     "COMMENT"
//                   );
//                   if (tracked) {
//                     return res.json(
//                       { message: "Message sent" },
//                       { status: 200 }
//                     );
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     if (!matcher) {
//       const customer_history = await getChatHistoryService(
//         webhook_payload.entry[0].messaging[0].recipient.id,
//         webhook_payload.entry[0].messaging[0].sender.id
//       );
//       if (customer_history.length > 0) {
//         const automation = await getAutomationInfoService(
//           customer_history[0]?.automationId
//         );

//         if (
//           automation?.userId.subscription.plan === "PRO" &&
//           automation.listener.type === "SMARTAI"
//         ) {
//           const smart_ai_message = await openai.chat.completions.create({
//             model: "gpt-4o",
//             message: [
//               {
//                 role: "assistant",
//                 content: `${automation.listener.prompt}: keep response under 2 sentences`,
//               },
//               ...customer_history,
//               {
//                 role: "user",
//                 content: webhook_payload.entry[0].messaging[0].message.text,
//               },
//             ],
//           });

//           if (smart_ai_message.choices[0].message.content) {
//             const receiver = await createChatHistoryService(
//               automation._id,
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               webhook_payload.entry[0].messaging[0].message.text
//             );

//             const sender = await createChatHistoryService(
//               automation._id,
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               smart_ai_message.choices[0].message.content
//             );

//             // await client.$transaction([receiver, sender])

//             const direct_message = await sendDM(
//               webhook_payload.entry[0].id,
//               webhook_payload.entry[0].messaging[0].sender.id,
//               smart_ai_message.choices[0].message.content,
//               automation.user.integrations[0].token
//             );

//             if (direct_message.status === 200) {
//               return res.json({ message: "Message sent" }, { status: 200 });
//             }
//           }
//         }
//       }

//       return res.json({ message: "No automation set" }, { status: 200 });
//     }
//     return res.json({ message: "No automation set" }, { status: 200 });
//   } catch (error) {
//     return res.json(
//       { message: `No automation set: ${error}` },
//       { status: 200 }
//     );
//   }
// };

// module.exports = instagramService;
