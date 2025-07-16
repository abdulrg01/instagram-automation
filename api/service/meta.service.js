const sendInstagramCommentReply = async (postId, commentId, message) => {
  // You must have a comment ID and page access token
  return await fetch(`https://graph.facebook.com/v19.0/${commentId}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    }),
  });
};

const sendInstagramDM = async (recipientId, message) => {
  return await fetch("https://graph.facebook.com/v19.0/me/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: message },
      messaging_type: "RESPONSE",
      access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    }),
  });
};

const getInstagramPosts = async (igBusinessId, accessToken) => {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/${igBusinessId}/media?fields=id,caption,media_url,media_type,timestamp&access_token=${accessToken}`
  );

  const data = await response.json();
  return data.data;
};

module.exports = {
  sendInstagramCommentReply,
  sendInstagramDM,
  getInstagramPosts,
};
