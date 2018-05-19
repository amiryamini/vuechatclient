const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/chatDatabase');
const Chat = require('../models/chat');

// Send Message
router.post('/chatClient', (req, res, next) => {

    let newChat = new Chat({
      name: req.body.name,
      message: req.body.message
    });

    Chat.addChat(newUser, (err, user) => {
      if (err) {
        res.json({ success: false, msg: 'Please enter a message' });
      } else {
        res.json({ success: true, msg: 'Message Sent' });
      }
    });  
});

// Receive Message
router.get('/chatClient', (req, res, next) => {
  const name = req.body.name;
  const message = req.body.message;

  Chat.getChatByName(name, (err, message) => {
    if(err) throw err;
    if(!message){
      return res.json({success: false, msg: 'Message not found.'});
        }
    });
});


module.exports = router;