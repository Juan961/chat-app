<template>
  <main>
    <form @submit.prevent="login">
      <h2>Log In</h2>
      <input type="email" placeholder="Email" v-model="user.email">
      <input type="password" placeholder="Password" v-model="user.password">
      <button>Login</button>
      <router-link to="/register">Don't have an account?</router-link>
    </form>
  </main>
</template>

<script>

import { login } from '@/logic/auth.logic'

export default {
  name:'PxLogin',
  data(){
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },  
  methods: {
    async login(){
      try {
        let result = await login(this.user)

        if(!result){
          alert("Correo o contraseña incorrectos")
        } else {
          alert("Welcome")

          localStorage.setItem('user_id', result._id)
          localStorage.setItem('user_name', result.name)

          this.$router.push('/chat')
        }
        
      } catch (error) {

        console.log(`Error: ${error.message}`)
      }
      
    }
  }
}
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  background: var(--black-background);
  display: flex;
  justify-content: center;
  align-items: center;
}

main form {
  width: 400px;
  display: flex;
  flex-direction: column;
}

form h2 {
  color: var(--white-title);
  margin-bottom: 20px;
}

form input {
  padding: 5px 20px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  border-radius: 5px;
}

form button {
  margin-bottom: 10px;
  padding: 5px 0;
  color: var(--white-title);
  background: var(--blue-send);
  font-size: 1.1rem;
  border: 2px solid var(--blue-send);
  border-radius: 5px;
  cursor: pointer;
}
</style>