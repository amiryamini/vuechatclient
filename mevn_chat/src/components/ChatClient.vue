<template>
    <!DOCTYPE html>
<html lang="en">
<head>
    <!-- <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous"> -->
]    <!-- <style>
        #messages{height:300px;}
    </style> -->
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-sm-12">
                <h1 class="text-center">
                    <button id="clear" class="btn btn-danger">Clear</button>
                </h1>
                <div id="status"></div>
                <div id="chat">
                    <!-- <input type="text" id="username" class="form-control" placeholder="Enter name..."> -->
                    <br>
                    <div class="card">
                        <div id="messages" class="card-block">

                        </div>
                    </div>
                    <br>
                    <textarea id="textarea" class="form-control" placeholder="Enter message..."></textarea>
                </div>
            </div>
        </div>
    </div>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script> -->
</body>
</html> 
</template>

<script>
export default {
  name: 'ChatClient',
  data () {
    return {
    //   msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      mongoose: require('mongodb').MongoClient,
      io: require('socket.io').listen(4000).sockets,
      chat () {
        mongoose.connect('mongodb://127.0.0.1/chathistory', function(err, db){
            if(err){
                throw err;
            }
            console.log('MongoDB connected...');

            //Connect to Socket.io
            io.on('connection', function(){
                let chat = db.collection('chats');

                //Create function to send status
                sendStatus = function(s){
                    socket.emit('status', s);
                }

                // Get chats from mongo collection
                chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
                    if(err){
                        throw err;
                    }

                    // Emit the messages
                    socket.emit('output', res);
                });    
                
                 // Handle input events
                socket.on('input', function(data){
                    let name = data.name;
                    let message = data.message;

                    // Check for name and message
                    if(message == ''){
                        // Send error status
                        sendStatus('Please enter a message');
                    } else {
                        // Insert message
                        chat.insert({name: name, message: message}, function(){
                            io.emit('output', [data]);

                            // Send status object
                            sendStatus({
                                message: 'Message sent',
                                clear: true
                            });
                        });
                    }
                });
                // Handle clear
                socket.on('clear', function(data){
                    // Remove all chats from collection
                    chat.remove({}, function(){
                        // Emit cleared
                        socket.emit('cleared');
                    });
                });
            });
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>