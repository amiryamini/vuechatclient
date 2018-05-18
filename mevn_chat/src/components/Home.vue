<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Join Our Chat</h2>
    <ul>
      <li>
        <router-link to="/Register" tag="button">Register</router-link>
      </li>
      <li>
        <router-link to="/Login" tag="button">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
