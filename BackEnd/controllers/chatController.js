const Chat = require("../models/chatModel");

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Chat.find().sort("timestamp");
    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const newMessage = new Chat({ senderId, receiverId, message });
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
