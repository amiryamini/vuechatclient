<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-sm-12">
                <h1 class="text-center">
                    ChatChit 
                    <br>
                    <button id="clear" class="btn btn-danger">Clear</button>
                </h1>
                <div id="chat">
                    <br>
                    <p>
                    <label for="message">Message</label>
                    </p>
                    <textarea id="textarea" class="form-control" placeholder="Enter message..."></textarea>
                </div>
            </div>
        </div>
        <button @click="register">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatClient',
  data () {
    return {
      msg: 'ChatClient'
    }
  },
  methods: {
      accepted() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
  },
            pushMessage () {
                axios.post('http://localhost:3000/chats/chatClient',
                {
                    name: name,
                    message: message
                })
            },
            getMessage () {
                axios.get('http://localhost:3000/chats/chatClient',
                {
                    name: name,
                    messages: messages
                })
                .then((res) => {
            // this.users.push(res.data)
            console.log(res);
            })
            .catch(function(error){
        console.log(error)
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
textarea {
    height: 300px;
    width: 500px;
}
</style>