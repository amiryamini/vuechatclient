const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/chatDatabase');

// User Schema
const ChatSchema = mongoose.Schema({
  name: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
});

const Chat = module.exports = mongoose.model('Chat', ChatSchema);

module.exports.getMessageById = function(id, callback){
  Chat.findById(id, callback);
}

module.exports.addChat = function(newMessage, callback){
        if(err) throw err;
        newMessage.save(callback);
}
