const mongo = require('mongodb').MongomainmainClient;
const mainClient = require('socket.io').listen(4000).sockets;
//Login Auth
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');



// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

//Chat Client
// Connect to mongo
// mongoose.connect('mongodb://127.0.0.1/chathistory', function(err, client){
//     if(err){
//         throw err;
//     }

//     console.log('MongoDB connected...');

//     // Connect to Socket.io
//     mainClient.on('connection', function(socket){
//         let chat = client.db.collection('chats');

//         // Create function to send status
//         sendStatus = function(s){
//             socket.emit('status', s);
//         }

//         // Get chats from mongo collection
//         chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
//             if(err){
//                 throw err;
//             }

//             // Emit the messages
//             socket.emit('output', res);
//         });

//         // Handle input events
//         socket.on('input', function(data){
//             let name = data.name;
//             let message = data.message;

//             // Check for name and message
//             if(name == '' || message == ''){
//                 // Send error status
//                 sendStatus('Please enter a name and message');
//             } else {
//                 // Insert message
//                 chat.insert({name: name, message: message}, function(){
//                     mainClient.emit('output', [data]);

//                     // Send status object
//                     sendStatus({
//                         message: 'Message sent',
//                         clear: true
//                     });
//                 });
//             }
//         });

//         // Handle clear
//         socket.on('clear', function(data){
//             // Remove all chats from collection
//             chat.remove({}, function(){
//                 // Emit cleared
//                 socket.emit('cleared');
//             });
//         });
//     });
// });