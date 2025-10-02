const Chat = require("../models/Chat");

// 1. Send message to AI mentor
exports.sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { mentor_type, text } = req.body;

  let chat = await Chat.findOne({ user: userId, mentor_type });
  if (!chat) {
    chat = await Chat.create({ user: userId, mentor_type, messages: [] });
  }

  chat.messages.push({ sender: "user", text });
  await chat.save();
  res.json({ status: "success", chat });
};
