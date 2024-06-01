const express = require('express');
const ChatRouter = express.Router();
const chatController = require('../controllers/chatController');

ChatRouter.get('/messages', chatController.getMessages);
ChatRouter.post('/messages', chatController.createMessage);

module.exports = ChatRouter;
