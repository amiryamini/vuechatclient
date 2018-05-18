<template>
    <div class="login">

        <p>
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
        </p>

        <p>
        <label for="password">Password</label>
        <input type="text" name="password" id="password" v-model="password">
        </p>
        
        <button @click="register">Login</button>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
        msg: 'Login'
    }
  },
  methods: {
      register () {
          axios.get('http://localhost:3000/users/authenticate',
          {
              email: email,
              password: password,
          })
        .then((res) => {
        // this.users.push(res.data)
        this.$router.push({ name: 'ChatClient',
          params: { name: res.data.name, email: res.data.email }})
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
h1,
h2 {
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
