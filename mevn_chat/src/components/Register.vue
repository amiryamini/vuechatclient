<template>
    <div class="register">
        <p>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" v-model="name">
        </p>

        <p>
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
        </p>

        <p>
        <label for="password">Password</label>
        <input type="text" name="password" id="password" v-model="password">
        </p>

        <p>
        <label for="password_dup">Password Again</label>
        <input type="text" name="password_dup" id="password_dup" v-model="password_dup">
        </p>

        <button @click="register">Submit</button>
    </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      msg: 'Register'
    }
  },
  methods: {
      register () {
          axios.post('http://localhost:3000/users/register',
          {
              name: name,
              email: email,
              password: password,
              password_dup: password_dup
          })
              .then((res) => {
        // this.users.push(res.data)
        this.$router.push({ name: 'Login'
          })
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
